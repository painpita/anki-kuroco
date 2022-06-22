# KuroKanji

![workflow](https://github.com/painpita/anki-kuroco/actions/workflows/build.yml/badge.svg)

## _A simple Kanji learning app based on Kuroco_

Powered by Gatsby, a React Framework ⚛️

KuroKanji is　a Webapp that lets its users learn Kanji by managing their own card list and generating HTML tiles which feature a kanji on a side and its signification on the other.
It features : 
  * User authentication support using Kuroco membership API
  * User specific lists
  * Creation of anki cards using Kuroco forms
  * Creation of card lists
  * Multi language support using the Kuroco engine
  * Automatic card generation using third party API

## About Gatsby

Gatsby is a React framework and a static site generator that aims to help build fast-loading websites. It is open-source and aggregates functionalities from React, GraphQL and Webpack.

https://www.gatsbyjs.com/

## 🚀 How to run

Dependencies : 

npm v14.15.0 or higher

Run the following commands to start the app in development mode :

``
npm install 
npm run dev
``

## 🔌 Plugins

KuroKanji uses the following plugins :
  * gatsby-source-filesystem : used to copy locale files to the public folder
  * gatsby-plugin-react-i18next : used for multi-language support
  * gatsby-plugin-sass : used to load scss styles in Gatsby

## 🧩 Frameworks

KuroKanji uses the following frameworks :
  * Gatsby
Gatsby is a static site generator (SSG) that binds together features of React, Webpack and GraphQL to help generate fast static websites. In KuroKanji, we use Gatsby features to help us navigate through React components, pass data between components, handle multi-language using GraphQL and sharing data through the website.
  * React
React is a front-end framework and a JS library that helps us create dynamic website by generating 'components' that bind together a template and its logic.
  * Material UI
Material UI is a React library that gives developers ready-to-use components to generate their front-end.

## 🛠️ Other tools

KuroKanji also uses the following tools :
  * Axios : used for building HTTP queries & interacting with Kuroco as well as managing authentication

## 🐛 Remaining bugs

Some bugs remain unfixed for now : 
  * Sometimes, the user might be redirected to the profile page without apparent reason. This is caused by incorrect error handling (401 unauthorized should redirect, but not other errors)
  * If the language is different from english, it will not display in flip cards (kuroco bug)

## Deploying the Gatsby App on KurocoFront

To deploy the app, the kuroco_front.json file should be stored in the /static folder at the root of the project. Upon building, Gatsby will move this file into the /public folder where it can be statically accessed.

# Functionalities

In this part we will discuss how the features shown in KuroKanji were implemented.

## Displaying content in Gatsby

To display some content, we want to start by creating a page and place it under /src/pages :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/326bf8f74737a3b8a3c1c795d7d72411.png)](https://diverta.gyazo.com/326bf8f74737a3b8a3c1c795d7d72411)

This page should contain a React component that returns some JSX code :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/2c83819d67e66131b4abd754634d4b88.png)](https://diverta.gyazo.com/2c83819d67e66131b4abd754634d4b88)

Then, run Gatsby by running the command "gatsby develop" in the CLI.

The new page should display at localhost:8000/example :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/f4d53faee371ae2dd0fdb1a7ded7192f.png)](https://diverta.gyazo.com/f4d53faee371ae2dd0fdb1a7ded7192f)

For KuroKanji, we do not include any logic (fetching, computation...) in the page. We will use a separate component.

## The custom Axios loader

In order to manage authentication and provide general fetching configuration, we can create a custom Axios client. To do this, create a new javascript file and have it export the following code :

```
import axios from "axios"

export default axios.create({
    baseURL: 'https://kurokanji.g.kuroco.app/rcms-api/',
    credentials: true,
    withCredentials: true
})
```

This way, we do not need to add the base URL everytime. This may prevent errors and make the code more readable. Also, we use this configuration to store credentials in the client and send the correct headers for every request.

We can then import this client instead of the defaut axios :

`
import axios from "../../authAxios"
`

## Basic features
### Listing topics

To list some topics, let's start by creating them in Kuroco !

Our content strcture looks like this :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/d4355b9ab665c11aaac2e4e0c0979803.png)](https://diverta.gyazo.com/d4355b9ab665c11aaac2e4e0c0979803)
("owner" extended column was replaced by Kuroro members, but we keep it for legacy purposes)

Once the content structure is ready we can start generating some cards :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/0375277c2a08bc5ed29c3e5b3c991252.png)](https://diverta.gyazo.com/0375277c2a08bc5ed29c3e5b3c991252)

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/f1e2626682b606077faea05b1aaeae28.png)](https://diverta.gyazo.com/f1e2626682b606077faea05b1aaeae28)

Once our content is ready, let's create an API endpoint :

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/225f151097fde142533df7ddd41644d9.png)](https://diverta.gyazo.com/225f151097fde142533df7ddd41644d9)

Don't forget to specify the topics_group_id parameter that should be equal to the content structure ID.

We can test our configuration in Swagger :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/593ab8c48626993f49f51eba5268a87d.png)](https://diverta.gyazo.com/593ab8c48626993f49f51eba5268a87d)

やった ! We can get our cards with the Kuroco API !

The next step is to create a component to display this data in our frontend.
For this we have a component named "CardDisplayer". It works in 3 steps : 
  1. Get the cards from the backend using Axios
  2. Map the cards to a JSX template
  3. Update the frontend using this template.

Let's go step by step :

We will first query the backend :
```
const CardDisplayer = (props) => {
  const [displayCards, setDisplayCards] = useState([])
  useEffect(()=>{
    getCards()
  }, [])

  async function getCards(){
    let url = ""
    try{
      switch(props.mode){
        case("my-cards"): 
          url = "/6/my-cards?cnt="; 
          break;
        case("favorites"): 
          url = "/6/get-fav?cnt="; 
          break;
        default: 
          url = "/4/random-cards?cnt=";
        }
        const cardsReq = await axios.get(url+props.numberOfCards)
        const cardsFromReq = cardsReq.data.list
        setDisplayCards(convertCardsToHtml(cardsFromReq))
    }
    catch{
      navigate("/profile")
  }  
```

The switch statement allows us to query a different set of cards according to the page that calls CardDisplayer. Please ignore it for now.

We use the axios client to query the data. we then extract a list from the data and use the React state to store our data using the UseState function. Please check [this documentation](https://reactjs.org/docs/hooks-effect.html) for more details regarding useState and useEffect.

For step 2 we will write a function to map this raw data to an HTML template using JSX :
```
function convertCardsToHtml(cards){
    return cards.map(
      (card,index)=>
        <Card myCard={props.mode==="my-cards"} key={card.topics_id} card={card} index={index}></Card>
    ) 
  } 
```

Note how we pass the data down to the component using props.

For step 3 we will make our component return a template that contains the "displayCards" variable :
```
const button = <Button style={{position:"absolute",right:"5%", bottom:"5%", fontSize:"xx-large", color:"#333"}} key="button" onClick={getCards}><RefreshIcon/></Button>
    return (<div>
            <div className="flexCardContainer">
              {displayCards}
              </div>
              {button}
          </div>
    )
```

This template will be updated everytime the "displayCards" variable is updated, since it is a state variable generated by useState().

As you can see, this code will generate a "Card" component for every element in the array. Let's create a "Card" component that will allow us to display our card :

```
const Card = (props) => {
    const t = useI18next()

    const handleClick = () => {
      t.navigate('/card_details/'+props.card.subject, {state:{myCard:props.myCard,topics_id:props.card.topics_id,locale:"locale"}})
    }
      return(
      <Fade in={true} direction="up" mountOnEnter unmountOnExit {...(true ? { timeout: props.index*200 } : {})}>
      <div role="command" className="card" onClick={handleClick} onKeyDown={handleClick}>
      <div className="content">
        <div className="front">
          {props.card.ext_1}
        </div>
        <div className="back">
          <div className="meanings">
          {props.card.ext_2.split("\n").join("· ")}
          </div>
          <div className="pronunciations">
            {props.card.ext_3.split("\n").join("· ")}
            <br></br>
            {props.card.ext_4.split("\n").join("· ")}
          </div>
        </div>
      </div>
    </div>
    </Fade>
    )
  }
  
  export default Card
```
We can use the "props" variable to get our parameters passed from the CardDisplayer.
Note that we also have a function to do something when the component is clicked.
All that there is left to do is to add some little styling to our card ("card.scss").

We can then display the cards in our frontend !

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/854710b7a47178b8a4e0583ed6d42c5e.png)](https://diverta.gyazo.com/854710b7a47178b8a4e0583ed6d42c5e)

Cool ! Using some normal CSS, we can have the card flip when we hover it 😎

### Authentication
### Creating a topic
### Official topics
### Favorite topics

## Advanced features
### Automatic card generation (using pre-processing)
### Multi-language feature (using i18next)