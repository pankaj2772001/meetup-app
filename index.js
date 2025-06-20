const {initializeData} = require('./db/db.connect')

initializeData()

require('dotenv').config()

const express = require("express")

const app = express()

app.use(express.json())

const cors = require('cors')

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000

const Event = require("./models/event.model")

const Speaker = require("./models/speaker.model")


const speaker = {
    "name": "Olivia Brooks",
    "designation": "author",
    "profileImageUrl": "https://drive.google.com/file/d/1OikmgYP-0EPmA7q4sLoYcVyVpyf8kLf8/view?usp=sharing"
  }

async function createSpeaker(){

    try {
        
        const newSpeaker = new Speaker(speaker)

        await newSpeaker.save()
    } catch (error) {
        
        console.log("Failed to add speaker", error)
    }


}

// createSpeaker()

const event = {
    "title": "Book Writing Bootcamp",
    "eventType": "Online",
    "eventTags": ["books", "writing", "education"],
    "description": "Unlock your inner author in this intense bootcamp.",
    "price": 35,
    "startDateAndTime": "July 18, 2025, 1:00 PM",
    "endDateAndTime": "July 18, 2025, 3:30 PM",
    "eventHosted": "Writers Guild",
    "eventImageUrl": "https://drive.google.com/file/d/1RpmlRNJLKd5OOjefs0_p1nkW8_FfGv_p/view?usp=sharing",
    "speaker": ["68544ac8252a31db0a8c99da"]
  }

async function createEvent(){

    try {

        const newEvent = new Event(event)

        await newEvent.save()
        
    } catch (error) {

        console.log("Failed to add new event", error)
        
    }
}

// createEvent()


//read all events
async function getAllEvents(){

    try {

        const allEvents = await Event.find().populate("speaker")

        return allEvents

    } catch (error) {
        console.log('Error', error)
    }
}

// getAllEvents()

app.get('/events', async (req, res) => {

    try {

        const event = await getAllEvents()

        if(event != 0){

            res.json(event)
        }else{

            res.status(404).json({error: "Not Events Found"})
        }

        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch recipe"})
        
    }
})

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})


