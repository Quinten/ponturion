onmessage = function(e) {
    console.log('Message received from main script');
    var result = 'Event: ' + (e.data.event);
    console.log('Posting message back to main script');
    postMessage(result);
}
