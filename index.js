const {initializeData} = require('./db/db.connect')

initializeData()

require('dotenv').config()

const express = require("express")

const app = express()

app.use(express.json())

const cors = require('cors')

const corsOptions = {
    origin: "https://meetup-app-frontend-sepia.vercel.app",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000

const Event = require("./models/event.model")

const Speaker = require("./models/speaker.model")


// const speaker = 
//     {
//     "name": "James Liu",
//     "designation": "cto",
//     "profileImageUrl": "https://example.com/images/speakers/james-liu.jpg"
//   }


async function createSpeaker(newspeaker){

    try {
        
        const newSpeaker = new Speaker(newspeaker)

        await newSpeaker.save()

        return newSpeaker
    } catch (error) {
        
        console.log("Failed to add speaker", error)
    }


}

// createSpeaker()

app.post('/speaker', async (req, res) => {

    try {

        const speaker = await createSpeaker(req.body)

        if(!speaker){

            res.status(404).json({error: "Failed to add speaker"})

        }else{

            res.status(201).json({message: "Speaker added successfully", newSpeaker: speaker})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to add Speaker"})
        
    }
})



// const event = {
//     "title": "AI in 2025: The Future Ahead",
//     "eventType": "Online",
//     "eventTags": ["AI", "technology"],
//     "description": "A virtual panel on emerging AI trends.",
//     "price": 20,
//     "startDateAndTime": "July 5, 2025, 2:00 PM",
//     "endDateAndTime": "July 5, 2025, 4:00 PM",
//     "eventHosted": "Global AI Forum",
//     "eventImageUrl": "https://example.com/images/ai-future.jpg",
//     "speaker": ["68550682f128d62b9c0e3827", "685506925e2860cc10d64b1d"]
//   }

async function createEvent(newevent){

    try {

        const newEvent = new Event(newevent)

        await newEvent.save()

        return newEvent
        
    } catch (error) {

        console.log("Failed to add new event", error)
        
    }
}

// createEvent()

app.post('/events', async (req, res) => {

    try {

        const event = await createEvent(req.body)

        if(!event){

            res.status(404).json({error: "Failed to add event"})

        }else{

            res.status(201).json({message: "Event added successfully", newEvent: event})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to add event"})
        
    }
})


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

async function updateEvent(eventId, dataToUpdate){

    try {

        const updatedEvent = await Event.findByIdAndUpdate(eventId, dataToUpdate, {new: true, runValidators: true})

        return updatedEvent
        
    } catch (error) {
        
    }
}

updateEvent("685506ef386cf0229a7df599", {location: "Manyata Tech Park, Bangaluru"})


app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})


