# CENTRO UNIVERSITÁRIO DE PATOS DE MINAS – UNIPAM  
## BACHARELADO EM SISTEMAS DE INFORMAÇÃO - 5º PERÍODO  
### DISCIPLINA DE TÓPICOS INTEGRADORES I  
**PROFESSOR RAFAEL MARINHO E SILVA**

---

# DOCUMENTAÇÃO DA PRÁTICA DE REDES, CONTAINERS E APLICAÇÃO DISTRIBUÍDA

## Objetivo
Capacitar os alunos a configurar e documentar um ambiente distribuído em rede local utilizando Linux (Lubuntu), Docker e uma aplicação web conectada a um banco de dados PostgreSQL em máquinas distintas.

---

## Descrição da Atividade

Nesta prática, os alunos irão trabalhar em **duas máquinas físicas conectadas em rede local**, onde:

- **Computador 1:** executará o banco de dados PostgreSQL (Docker)
- **Computador 2:** executará a aplicação web Node.js (Docker)

Os alunos deverão configurar:

- Endereçamento IP fixo
- Comunicação entre máquinas
- Liberação de portas
- Conexão entre aplicação e banco via rede

---

### Definir IP fixo (Netplan)

Editar:

```bash
sudo nano /etc/netplan/01-netcfg.yaml
```

Exemplo:

#### Computador 1 (Banco)

```yaml
network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: no
      addresses:
        - 192.168.0.10/24
      gateway4: 192.168.0.1
      nameservers:
        addresses: [8.8.8.8]
```

#### Computador 2 (App)

```yaml
network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: no
      addresses:
        - 192.168.0.20/24
      gateway4: 192.168.0.1
      nameservers:
        addresses: [8.8.8.8]
```

Aplicar:

```bash
sudo netplan apply
```

---

### Teste de comunicação

No computador 2:

```bash
ping 192.168.0.10
```

---

## Instalação de Softwares

```bash
sudo apt update
sudo apt install docker.io docker-compose -y
```

---

## Configuração do Banco de Dados (Computador 1)

### docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:14
    container_name: postgres_container
    restart: always
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: projeto
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

Executar:

```bash
docker-compose up -d
```

---

## Configuração da Aplicação (Computador 2)

### IMPORTANTE: Alterar conexão com banco

No `server.js`:

```js
const pool = new Pool({
  user: 'root',
  host: '192.168.0.10',
  database: 'projeto',
  password: 'root',
  port: 5432,
});
```

---

### docker-compose.yml (APP)

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
```

Executar:

```bash
docker-compose up -d
```

---

## Liberação de Portas (Firewall)

Se necessário:

```bash
sudo ufw allow 5432
sudo ufw allow 3000
```

---

## 8. Testes

### Acesso via navegador:

```
http://192.168.0.20:3000
```

---

## 9. Estrutura do Projeto

```
projeto-nodejs-html/
├── docker-compose.yml
├── dockerfile
├── server.js
├── package.json
├── public/
```

## Boa atividade!
