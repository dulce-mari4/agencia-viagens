# FlyDream: Agência de Viagens (Mobile PWA)

<img width="374" height="784" alt="flydream git" src="https://github.com/user-attachments/assets/81728729-e28a-46f0-8298-423e8a8f957b" />


O **FlyDream** é um protótipo de aplicativo focado na jornada do usuário para a seleção e reserva fictícia de passagens aéreas. O projeto foi desenvolvido como parte de uma atividade acadêmica, com o objetivo de demonstrar a viabilidade de Progressive Web Apps (PWAs) integradas a microsserviços.

---

## Sobre o Projeto

O aplicativo adota a abordagem **Mobile-First**. Utilizando recursos de PWA, o sistema pode ser instalado diretamente no dispositivo móvel a partir do navegador. O aplicativo opera em modo de acesso responsivo via rede local e exibe um ícone personalizado na tela inicial do aparelho, oferecendo uma experiência de usabilidade próxima à de um aplicativo nativo.

### Principais Funcionalidades
* Visualização dinâmica de destinos turísticos renderizados em formato de *cards*.
* Seleção interativa de horários de voo, classes de viagem (Econômica/Executiva) e poltronas.
* Cálculo automático de tarifas com base na classe e destino escolhidos.
* Validação de formulários (bloqueio da submissão até o preenchimento integral dos dados necessários).
* Consumo de dados em tempo real através de uma API REST local.

---

## Arquitetura de Software

O projeto foi estruturado utilizando o padrão arquitetural **MVVM (Model-View-ViewModel)** para garantir a separação de responsabilidades e a manutenibilidade do código:

* **View (HTML5/CSS3):** Camada de interface com o usuário. A estilização utiliza Flexbox e CSS Grid para garantir a total responsividade mobile.
* **ViewModel (JavaScript Vanilla):** Camada intermediária que gerencia o estado da aplicação (*State*), manipula o DOM de forma dinâmica, intercepta os eventos disparados na View e faz a ponte na troca de dados com o Model.
* **Model (Python/Flask):** Representado por uma API REST estruturada em Python, responsável por fornecer os dados dos voos em formato JSON.

### Acesso à Rede
O front-end realiza a comunicação com o servidor de forma assíncrona utilizando a **Fetch API** nativa do JavaScript, efetuando requisições HTTP do tipo `GET` para a obtenção da lista de destinos cadastrados.

---

## Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3, JavaScript (ES6+).
* **Back-end:** Python 3, Flask, Flask-CORS (para tratamento de *Cross-Origin Resource Sharing* em ambiente local).
* **Mobile/PWA:** Web App Manifest (`manifest.json`) e Service Workers (`sw.js`).
* **Assets:** FontAwesome.

---

## Instruções de Execução

Para testar a aplicação em ambiente de desenvolvimento local, siga o procedimento abaixo.

### Pré-requisitos
Certifique-se de ter o Python 3 instalado no seu ambiente. Instale as dependências do back-end utilizando o gerenciador de pacotes:

```bash
pip install flask flask-cors
```

### Passo 1: Inicializar a API
1. Abra o terminal na raiz do projeto.
2. Execute o servidor de dados:
```bash
python app.py
```
> **Nota:** O servidor será iniciado na porta `5000`. O terminal exibirá o seu endereço IP na rede local (ex: `http://192.566.0.4:5000`).

### Passo 2: Inicializar o Servidor Front-end
1. Em um novo terminal, navegue até o diretório de arquivos públicos:
```bash
cd public
```
2. Inicie o servidor HTTP embutido do Python na porta `8080`:
```bash
python -m http.server 8080
```

### Passo 3: Acesso via Dispositivo Móvel
1. Certifique-se de que o dispositivo móvel e o computador host estejam conectados à **mesma rede Wi-Fi**.
2. No navegador do smartphone, acesse o IP da máquina host na porta do front-end. Exemplo: `http://192.566.0.4:8080` *(substitua pelo IP obtido no Passo 1)*.

### Instalação do PWA:
* **Android (Chrome):** Acesse o menu de opções (três pontos verticais) e selecione **"Instalar aplicativo"** ou **"Adicionar à tela inicial"**.
* **iOS (Safari):** Selecione o ícone de compartilhamento e escolha a opção **"Adicionar à Tela de Início"**.

---

## Resumo do Memorial Acadêmico

* **Problema:** Necessidade de mitigar o alto custo de desenvolvimento de aplicativos nativos para pequenas agências de viagens através de soluções híbridas para rápida validação de produto (MVP).
* **Metodologia:** Divisão modular baseada no desacoplamento de código (MVVM), integração assíncrona orientada a serviços (API REST) e distribuição descentralizada via PWA.
* **Resultados:** Obtenção de um protótipo responsivo, com baixo tempo de carregamento e comportamento semelhante ao nativo, validando a eficácia técnica do uso de tecnologias Web para o ecossistema mobile.

---
Desenvolvido por Dulce Maria.
