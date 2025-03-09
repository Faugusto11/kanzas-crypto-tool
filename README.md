# Kanzas Cryptocurrency Wallet Management Tool (WIP)

![GitHub](https://img.shields.io/badge/license-MIT-blue) ![GitHub](https://img.shields.io/badge/status-Work%20in%20Progress-orange) ![GitHub](https://img.shields.io/badge/version-1.0.0-green)

Kanzas is a highly customizable tool for managing cryptocurrency wallets, designed to offer secure and flexible digital asset management.

---

## Table of Contents
- [English Version](#english-version)
  - [Installation](#installation)
  - [Database Configuration](#database-configuration)
  - [Import Database Schema](#import-database-schema)
- [Versão em Português](#versão-em-português)
  - [Instalação](#instalação)
  - [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
  - [Importar Estrutura do Banco de Dados](#importar-estrutura-do-banco-de-dados)

---

## English Version

### Installation

1. **Install Required Services**:
   - Install Apache and MySQL. We recommend using [XAMPP](https://www.apachefriends.org/index.html) for an easy setup.

2. **File Organization**:
   - All website files are located in the `website` folder.

### Database Configuration

1. Create a file named `server.env` in the `website/config` folder.
2. Add your database configuration using the template below:

   ```env
   DB_HOST=yourDBHost       # Use 'localhost' if using XAMPP
   DB_USER=yourDBUser       # User must have read and write permissions
   DB_PASS=yourDBPassword
   DB_PORT=yourDBPort       # Usually 3306
   DB_NAME=yourDBName       # Defaults to "kanzas" in createDB.sql

## Import Database Schema

Run the `createDB.sql` file to import the necessary table structures into your database.

---

## Versão em Português

### Instalação

1. **Instale os Serviços Necessários**:
   - Instale o Apache e o MySQL. Recomendamos o uso do [XAMPP](https://www.apachefriends.org/index.html) para facilitar a configuração.

2. **Organização dos Arquivos**:
   - Todos os arquivos do site estão localizados na pasta `website`.

### Configuração do Banco de Dados

1. Crie um arquivo chamado `server.env` na pasta `website/config`.
2. Adicione as configurações do seu banco de dados utilizando o modelo abaixo:

   ```env
   DB_HOST=seuDBHost        # Utilize 'localhost' se estiver usando o XAMPP
   DB_USER=seuDBUser        # O usuário deve ter permissões de leitura e escrita
   DB_PASS=seuDBPassword
   DB_PORT=seuDBPort        # Normalmente 3306
   DB_NAME=seuDBName        # O arquivo createDB.sql utiliza "kanzas" como padrão

## Importar Estrutura do Banco de Dados

Execute o arquivo `createDB.sql` para importar as estruturas de tabelas necessárias para o sistema.

---

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or support, please contact [Kanzas Devs] at [kanzascrypto@gmail.com](mailto:kanzascrypto@gmail.com).
