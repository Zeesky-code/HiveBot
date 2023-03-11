const validateMessage = require('./utils/validator')
class ChatSessionEvent{
    constructor({eventName, message}){
        this.eventName =  eventName;
        this.message = message
    }
}
class ChatSession{
    constructor({io, sessionData}){
        this.socket = io
        this.sessionData = sessionData
    }
    createEvent({message}){
        const event  = new ChatSessionEvent({eventName:'botMessage', message})
        return event
    }   
    emitMessage(event){
        this.socket.emit(event.eventName, event.message)
    }
    displayOptions(){
        const options = `Select 1 to place an order
                        <br />Select 99 to checkout order
                        <br />Select 98 to see order history
                        <br />Select 97 to see current order
                        <br />Select 0 to cancel order`
        const optionsEvent = this.createEvent({message:options})
        this.emitMessage(optionsEvent)
    }
    displayError(){
        const errorEvent = this.createEvent({message: 'Invalid Selection, please try again'})
        this.emitMessage(errorEvent)
    }
    checkUserMessage({message}){
        if(!validateMessage(message)){
            this.displayError()
        }

        var botresponse ="";
        switch(parseInt(message)){
            case 1:
                botresponse += "You selected 1 <br> here is the menu";
                console.log(botresponse)
                break;
            case 99:
                botresponse += "You selected 99 <br> checkout your order";
                break;
            case 98:
                botresponse += "You selected 98 <br> here is your order history";
                break;
            case 97:
                botresponse += "You selected option 97 <br>order canceled";
                break;
            default:
                botresponse += "Invalid selection";
                break;
        }
        const inputEvent = this.createEvent({message: botresponse})
        this.emitMessage(inputEvent)
    }
}

module.exports = ChatSession