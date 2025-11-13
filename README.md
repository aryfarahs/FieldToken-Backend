# 🏷️ FieldToken – Documentação da Arquitetura

## 👥 Autores
- **Ary Farah**  
- **Bárbara Tippa**  
- **Ícaro Kucha**  
- **Pedro Fauth**  
- **Thiago Kwon**

---

# 📘 Visão Geral do Projeto

O **FieldToken** é um ecossistema backend baseado em microserviços, desenvolvido para gerenciar **usuários** e **ativos**, seguindo princípios modernos de arquitetura distribuída e event-driven.

A comunicação entre os componentes é feita por meio do **Azure Service Bus**, consumido por **Azure Functions**, que orquestram chamadas para microserviços hospedados em **Azure Container Apps**.

A arquitetura é documentada utilizando o modelo **C4**.

Fluxo principal do sistema:

**Frontend → BFF → Service Bus → Azure Function → Microserviços**

---

# 🏛️ Arquitetura (C4)

## 📍 C4 – Nível 1: Diagrama de Contexto

O ecossistema inclui:

- Usuários (atores externos)
- Frontend
- BFF (Backend for Frontend)
- Azure Service Bus
- Azure Functions
- Microserviço de Usuário  
- Microserviço de Ativos  
- Banco de dados individual por microserviço

O BFF recebe requisições HTTP e transforma requisições síncronas do frontend em eventos assíncronos enviados ao barramento.

---

## 📍 C4 – Nível 2: Diagrama de Containers

### **BFF (NestJS)**
- Exposto ao frontend  
- Valida entradas  
- Publica eventos no Azure Service Bus  

### **Azure Service Bus**
- Barramento de eventos  
- Desacopla comunicação entre aplicações  
- Garante entrega com retry e dead-letter  

### **Azure Functions**
- Consumidores das filas  
- Orquestram os eventos → microserviços  
- Executam chamadas HTTP para criação de usuários e ativos

### **Microserviços**
- Deploy em Azure Container Apps  
- `fieldtoken-usuario` (SQL Server)  
- `fieldtoken-ativos` (MongoDB)  
- Implementam regras de negócio independentes

---

## 📍 C4 – Nível 3: Componentes

### **BFF**
- Controllers  
- Services  
- Publicador de Service Bus  
- DTOs e validações  

### **Functions**
- Funções específicas para cada fila  
- Processamento de mensagens  
- Reenvio para os micros via HTTP  

### **Micros**
Camadas:
- Controller  
- Service  
- Repository  
- Entidades  
- Persistência em bancos independentes

---

## 📍 C4 – Nível 4: Diagrama de Sequência (Fluxo CREATE)

```mermaid
sequenceDiagram
    autonumber
    Frontend->>BFF: POST /usuario
    BFF->>Service Bus: Publish usuario.created
    Service Bus->>Azure Function: Deliver message
    Azure Function->>Microserviço Usuario: POST /usuario
    Microserviço Usuario->>DB: Insert
    Microserviço Usuario->>Azure Function: 201 Created
    Azure Function->>Service Bus: Complete message
