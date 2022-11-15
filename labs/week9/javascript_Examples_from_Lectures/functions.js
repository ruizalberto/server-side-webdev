function fuddify(speech) {
    if (typeof speech !== "string") {
        console.error("Nice twy, wabbit!");
        return;
    }        
    else
    {
        speech = speech.replace(/R/g, "W");
    return speech;
}
}
var utterance = fuddify("Real World");
console.log(utterance)