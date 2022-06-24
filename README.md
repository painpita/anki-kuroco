# KuroKanji

![workflow](https://github.com/painpita/anki-kuroco/actions/workflows/build.yml/badge.svg)

[Try me on KurocoFront !](https://kurokanji.g.kuroco-front.app/)
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

```
npm install 
npm run dev
```

## 🔌 Plugins

KuroKanji uses the following plugins :
  * gatsby-source-filesystem : used to copy locale files to the public folder
  * gatsby-plugin-react-i18next : used for multi-language support
  * gatsby-plugin-sass : used to load scss styles in Gatsby

## 🧩 Frameworks

KuroKanji uses the following frameworks :
  * **Gatsby**  
Gatsby is a static site generator (SSG) that binds together features of React, Webpack and GraphQL to help generate fast static websites. In KuroKanji, we use Gatsby features to help us navigate through React components, pass data between components, handle multi-language using GraphQL and sharing data through the website.
  * **React**  
React is a front-end framework and a JS library that helps us create dynamic website by generating 'components' that bind together a template and its logic.
  * **Material UI**  
Material UI is a React library that gives developers ready-to-use components to generate their front-end.

## 🛠️ Other tools

KuroKanji also uses the following tools :
  * **Axios** : used for building HTTP queries & interacting with Kuroco as well as managing authentication
  * **Swal** : used to display nice popup notifications in order to display information or get additional inputs

## 🐛 Remaining bugs

Some bugs remain unfixed for now : 
  * Sometimes, the user might be redirected to the profile page without apparent reason. This is caused by incorrect error handling (401 unauthorized should redirect, but not other errors)
  * If the language is different from english, it will not display in flip cards (kuroco bug)
  * When expecting card details, changing the language will trigger a 404 error if the card is not defined in target language
  
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

**やった** ! We can get our cards with the Kuroco API !

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

Notice how we pass the data down to the component using props.

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

In KuroKanji, we added some spice by making Kuroco return cards in a random order by setting the "shuffle" parameter. By combining this with the "count" parameter, we can display seemingly random cards on the screen.

### Authentication

The authentication process is more complicated. There are many ways to implement some authentication in a webapp. We will discuss how it is done in KuroKanji.

First, let's define authentication on Kuroco's side : start by creating a new API ("auth_users in KuroKanji"). Using the "security" menu, we select the "Dynamic access token". We then create the 4 standard routes for authentication :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/096126f4570619a068a6aece61dc4bfc.png)](https://diverta.gyazo.com/096126f4570619a068a6aece61dc4bfc)

The next step is creating a "service" to hold the authentication functions. We define a "service" as a set of variables and functions that doesn't return any templating.

Let's start by implementing a login function :
```
export const handleLogin = async ({ email, password }) => {
    const {data:{grant_token}} = await axios.post("/6/login",{email,password})
    const {data:{access_token}} = await axios.post("/6/token",{grant_token})
    setUser({username:email})
    saveAccessToken(access_token)
    setAccessTokenOnRequestHeader(access_token)
}
```

  1. The "login" endpoint returns a grant_token that we can use against the "token" endpoint to get the "grant_token".
  2. We then set the user using the setUser function to access data like user email and name in the app
  3. We also save the access token using saveAccessToken
  4. Finally, we attach the token to the axios client

Here are the functions called in handleLogin:

```
const saveAccessToken = token => {
  window.localStorage.setItem("accessToken", JSON.stringify(token))
}

const setAccessTokenOnRequestHeader = (rcmsApiAccessToken) => {
            axios.defaults.headers.common = {
                'X-RCMS-API-ACCESS-TOKEN': rcmsApiAccessToken.value
            }    
}

const setUser = user => {
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
}
```

We just store the data in the local storage.
In order to store the token in the Axios client, we set the 'X-RCMS-API-ACCESS-TOKEN' value in the axios headers.

Let's test these functions by creating a "Login" component !

It should return a form to let us send our information to Kuroco. Here we use the ValidatorForm from material UI to validate the fields.

```
 <div className="formWrapper">
         <Typography><Trans>not_logged_in</Trans></Typography>
          <ValidatorForm className="formWrapper" onSubmit={handleSubmit}>
          <TextValidator
              className="email" 
              label="email" 
              type="text"
              name="email"
              variant="outlined" 
              validators={['required',"isEmail"]}
              errorMessages={['This field is required',"Should be email"]}
              value={loginInfo.email}
              onChange={handleUpdate}
            />
          <TextValidator
              className="password" 
              label="password" 
              type="password"
              name="password"
              variant="outlined" 
              validators={['required']}
              errorMessages={['This field is required']}
              value={loginInfo.password}
              onChange={handleUpdate}
            />
          <Button className={"formButton"} type="submit">
          <Trans>login</Trans>
        </Button>
        </ValidatorForm>
      </div>
```
This is the function that is called when the form is submitted : 

```
import { handleLogin, isLoggedIn } from "../services/auth"
  const handleSubmit = async event => {
    event.preventDefault()
    try{ 
      await handleLogin(loginInfo)
    }
    catch(e){
      window.alert(e)
      loginInfo.message=e
      return
  }
  navigate("/")
}
```
This function is simply calling the "handleLogin" function from our auth service. If it fails, it will display a message to the user.

When we submit the correct info to our form, we should see these values in our local storage :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/d3fc3eaff17a5bc9693298431fee8a43.png)](https://diverta.gyazo.com/d3fc3eaff17a5bc9693298431fee8a43)

We will use this access token to check if the user is connected and fetch a grant_token when needed.

Next we will implement a function to check if the session is still alive in Kuroco to avoid any session mismatch between the frontend and the backend :

```
export const isLoggedIn = async (props) => {
  try{
      const token = getAccessToken()
      setAccessTokenOnRequestHeader(token)
      const {data} = await axios.get('/6/profile')
      setUser({
        email : data.email, 
        name1 : data.name1, 
        name2: data.name2,
        language: data.tags[0].tag_nm
      })
      const user = getUser()
      return user
  }
  catch(e){
    return null
  }
}
```

We will also implement a logout function :

```
export const handleLogout = async () => {
  try{
    await axios.post("/6/logout")
  }
  catch{}
  setUser(null)
  saveAccessToken(null)

  setAccessTokenOnRequestHeader({rcmsApiAccessToken:null})
}
```

This function clears the session on the backend and resets the local storage and the axios header.

The logout component is a very simple form with a submit handler that looks like this :
```
    const handleSubmit = async event => {
        event.preventDefault()
        await handleLogout()
    }
```

Finally, we wrap everything in an "Auth" component that will display the correct form based on user state:

```
const Auth = (props) =>{
  // Use language iso for the routes
  const [user, setUser] = useState(null)
  async function getUser(){
    const getUser = await isLoggedIn()
    setUser(getUser)
  }
  getUser()
    
    if((user==null)|(user==undefined)){
      return(<Paper className={"paper"}>
      <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <Login></Login>

  </div>
  </Paper>)
    }
    else{
      return (<Paper className={"paper"}>
        <div className="logoutCard">
          <Logout user={user}></Logout>
        </div>
        </Paper>)
    }
}
```

### Displaying topic details

Generating pages dynamically in Gatsby is easy : just create a 'card_details/' folder under 'src/pages/' which contains a page called [id].js.
The bracket notation is used to indicate that the URL should be dynamic and display different information according to what we pass in the access link.
Take a look a the navigation we had in Card.js :

```
const handleClick = () => {
      t.navigate('/card_details/'+props.card.subject, {state:{myCard:props.myCard,topics_id:props.card.topics_id,locale:"locale"}})
    }
```
We can pass the data using the second parameter of navigate().

Let's see how we can get this data in the [id].js page !

```
import React from "react"
import Layout from "../../components/Layout"
import CardDetail from "../../components/CardDetail"

const cardDetail = (props) => {
  if(typeof window!=="undefined"){
  return <div>
  <Layout>
    <CardDetail myCard={props.location.state.myCard} topics_id={props.location.state.topics_id} locale={props.location.state.locale}></CardDetail>
  </Layout>
  </div>
  }
  else return
}

export default cardDetail;
```

Voilà ! We can access this data in our CardDetail component.

Again, the CardDetail component is lengthy. Please check the comments in the code for more information regarding this component.

### Creating a topic
Now that we have a logged user, let's generate new topics from the frontend ! 

Start by creating a new endpoint in the auth_users API : 
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/eb6fc4832034b838d079b968658e3756.png)](https://diverta.gyazo.com/eb6fc4832034b838d079b968658e3756)

Then we will create a new component called "NewCard". The code for this is quite lengthy, so please refer to the NewCard component comments for this process.

### Official topics

In KuroKanji, we have a list of "official" topics.
This is used to provide some cards that anyone can use, while making sure that topics generated by users remain private (there should be no api query that returns all cards directly).
To do this, we add the tag "validated" to cards that should be "official" :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/23bd17a5ec06186dba66befe786a515e.png)](https://diverta.gyazo.com/23bd17a5ec06186dba66befe786a515e)

And we add API queries to get all cards that are tagged with "validated" : 

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/53cfd6a460d608948f5b03a5bb5e83c0.png)](https://diverta.gyazo.com/53cfd6a460d608948f5b03a5bb5e83c0)

Notice the parameter "tag_id=['2']"

### Favorite topics

Using the "activity" module in Kuroco, we can let users "like" cards so they can display their "liked" cards in a separate page.
To do this, we first define "like" and "unlike" routes in Kuroco :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/ba9e08a788a1d05eefb8848035e367bf.png)](https://diverta.gyazo.com/ba9e08a788a1d05eefb8848035e367bf)

The "fav" route is used to get a list of our favorite IDs.

We also define a "get-fav" route to get all topics that the user liked using the "my_favorite_list" parameter :
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/506437bcf0343fb1574d72e74c64d734.png)](https://diverta.gyazo.com/506437bcf0343fb1574d72e74c64d734)

Notice that "get-fav" and "fav" are different :
  * "fav" only returns a list of ID. It is linked to the "favorite" model that is a relation between a content and a member.
  * "get-fav" returns a list of topics that were liked by a member. It is linked to the "topic" model.

To call these endpoint, we will create a simple LikeButton component which is loaded in CardDetail :

```
return (<div className="like">
  <input type="checkbox" id="checkbox" checked={liked} onChange={onChange}/>
```
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/198b378d3cc3173069dfd68e147c5c03.png)](https://diverta.gyazo.com/198b378d3cc3173069dfd68e147c5c03)

Using some CSS styling, we get a cool "like" button !  

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/deed71d887e8df339f4e57470bc70acd.gif)](https://diverta.gyazo.com/deed71d887e8df339f4e57470bc70acd)
(thx https://codepen.io/robeen/pen/PbvJjy for the design)

## Advanced features

In this part we will discuss more "advanced" features within KuroKanji.

### Automatic card generation (using pre-processing)

When creating a new card we have to search for all the files and fill them manually. Tedious, isn't it ?
Fortunately this process can be automated using Kuroco pre-processing !

There are 2 different APIs that we used for this function : 
  * https://kanjiapi.dev/v1/kanji/　is a very simple API with no authentication. While convenient, it does not provide any example words, and is pretty limited.
  * https://kanjialive-api.p.rapidapi.com/api/public/kanji/ is a very complete Kanji API, but it requires API authentication and an account on https://rapidapi.com/

We will start with kanjiapi.dev. First, let's look at the response we get from the API : 

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/cda6c36d479df6d7892d4aaadf54e78e.png)](https://diverta.gyazo.com/cda6c36d479df6d7892d4aaadf54e78e)

We can see that the response contains arrays such as "meanings", "kun_readins", "on_readings" which we will use in our pre-processing script.

Now, let's create a function in Kuroco !

We start by initializing the variables we need :

```
{assign var="baseUrl" value="https://kanjiapi.dev/v1/kanji/"}
{assign_array var="request" values=""}
{assign var=meanings value=""}
{assign var=on_readings value=""}
{assign var=kun_readings value=""}
```

Then, we check the value of of ext_1 in the request and assign it as the kanji in our API query :
```
if isset($smarty.post.ext_1)}
    {assign var="queryKanji" value=$smarty.post.ext_1}
```

Using the api function, we can make a HTTP query. Let's make a GET request and store the response in the "kanji" variable.
```
    {api endpoint=$baseUrl|cat:$queryKanji method='GET' query='' cache_time=20 var='kanji' status_var='status'}
```

We then decode the value using the json_decode modifier: 
```
    {assign var=result_json value=$kanji|json_decode}
```

Once the json is decoded, we use a for loop to parse and store the data, for example with the meanings:

```
{foreach from=$result_json.meanings item=meaning}
        {assign var=meanings value=$meanings|cat:"$meaning\n"}
    {/foreach}
```

Finally, we store the data in our request variable. This variable will be transmitted to the Kuroco engine.
```
  {assign
        var="request.ext_2"
        value=$meanings
  }
```

Now, we just need to attach this function to a POST endpoint in the API page, and it will be triggered everytime we create a new card using this endpoint !

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/f186c443095d02f096f2adfc43608c98.png)](https://diverta.gyazo.com/f186c443095d02f096f2adfc43608c98)

### Multi-language feature (using i18next)

There are many solutions available to provide multi-language support in a react environment. For this tutorial, we will use i18next with a gatsby wrapper plugin called gatsby-plugin-react-i18next. This plugin has many advantages :
  * It provides many useful tools like the useI18next hook that lets us access data easily in plugins
  * It works seamlessly with dynamic page generation unlike other Gatsby multi language plugins 
  * It passes the language in the URL, allowing better referencing in browsers
  * It is an official Gatsby plugin
  
So, let's get started using gatsby-plugin-react-i18next !

Start by installing the required dependencies :
`npm install --save gatsby-plugin-react-i18next i18next react-i18next`

Then, import the plugin in your gatsby-config.js file :

```
{
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          localeJsonSourceName: `locale`,
          languages: [`en`, `fr`, `jp`],
          defaultLanguage: `en`,
          siteUrl: `http://localhost:8000/`,
          i18nextOptions: {
            interpolation: {
              escapeValue: false 
            },
            //keySeparator: false,
            nsSeparator: false
          },
        }
      }
```

Also, import the gatsby-source-filesystem which will be needed.

```
{
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/locales`,
          name: `locale`
        }
      },
```

In order to enable translations, create a /locale directory at the root of the project. It should contain a sub-directory for every language and a translation.json file under each of these folders.  

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/0f51727cf4e5f6d267ed28f5ed6c2b93.png)](https://diverta.gyazo.com/0f51727cf4e5f6d267ed28f5ed6c2b93)  

You can use this image as an example for the translation.json file :  

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/494fa2cbcda0730c858b028eade647c5.png)](https://diverta.gyazo.com/494fa2cbcda0730c858b028eade647c5)

The last step before implementing translations in our components is to add this function to your gatsby-node.js file :

```
exports.onPostBuild = () => {
  console.log("Copying locales")
  fs.copySync(
    path.join(__dirname, "/locales"),
    path.join(__dirname, "/public/locales")
  )
}
```

As you can see this will make our translation files visible at the /locales path on the file server.

Let's start translating right away ! 

We need to insert this GraphQL query to any page that needs translating :
```
export const query = graphql`
query($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
}
`;
```

Then we can import the required code in our components :
`import {Trans, useI18next} from 'gatsby-plugin-react-i18next';`

The "Trans" component can be called like a JSX tag : <Trans>meanings</Trans>. The content is then automatically translated to locale.meaning !

Finally, let's create a component to change the language.

We will use a Material useI18next drop-down together with react-country-flag :
```
return (
        <FormControl variant="standard">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Language"
          defaultValue={t.language}
          onChange= {handleChangeLanguage}
        >
            <MenuItem value="en"> <ReactCountryFlag countryCode="GB" /></MenuItem>
            <MenuItem value="fr"><ReactCountryFlag countryCode="FR" /></MenuItem>
            <MenuItem value="jp"><ReactCountryFlag countryCode="JP" /></MenuItem>
        </Select>
      </FormControl>
    )
```

Our handler function will use the changeLanguage() function from the useI18next hook :

```
  const t = useI18next()
    const {languages, changeLanguage} = useI18next();

    const handleChangeLanguage = (e) => {
      changeLanguage(e.target.value)
    }
```

That's it !

We can use the dropdown to switch the language in our application :

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/7380672b44d1ca0162d17980599c5e35.gif)](https://diverta.gyazo.com/7380672b44d1ca0162d17980599c5e35)


# ❓ Problems encountered - solutions implemented 

Some problems were encountered by developping the application. Here are some of them and how they were solved - or not.

   1. Understanding Gatsby, GraphQL, React, implications of static site generation 

Since Gatsby is a toolkit on top of React, it has its own concepts and components. Implementing GraphQL queries can also be troublesome at first without prior experience.
This Youtube channel is very useful : https://www.youtube.com/watch?v=Qms4k6y7OgI&list=PL4cUxeGkcC9hw1g77I35ZivVLe8k2nvjB
For React, the official documentation is very well-made : https://reactjs.org/docs/getting-started.html

  2. Implementing remote API fetching in Kuroco Smarty pre-processing

Since the {api} function is not standard, there is no documentation online regarding how to use it. Fortunately this example is available on Diverta Github : 
https://github.com/diverta/kuroco-smarty/blob/master/examples/API/REST/GoogleCloudVisionAPI/uploaded_image_check.tpl

  3. Implementing multi-language support in the frontend

The difficulty here stems from the multiple ways multi-language can be implemented. At first, the plugin gatsby-plugin-intl was used, but it showed limitation to handle dynamically generated pages. The solution came with using gatsby-plugin-i18n instead, which works seamlessly.

  4. Handling multi-language with tags

Unfortunately, Kuroco has a bug right now where queries for a language different from default together with tags will return nothing every time. Also, the _lang variable cannot be accessed in pre-processing, so we couldn't redirect queries automatically for undefined multi language cards.



