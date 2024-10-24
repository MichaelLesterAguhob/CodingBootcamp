function determineWaterState(temperature) {
    if(typeof temperature !== "number") {
        return undefined;
    }

    if(temperature < 0) {
        return 'solid';
    } else if(temperature <= 100) {
        return 'liquid';
    } else {
        return 'gas';
    }
}


