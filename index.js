window.addEventListener('load', () => {
    // const handleResult = (ev) => {
    //     console.log(ev);
    // }

    // const handleError = (ev) => {
    //     console.log(ev);
    // }

    const getRand = (max) => Math.floor(Math.random() * Math.floor(max));

    const handleSubmit = (address) => {
        // const req = new XMLHttpRequest();

        // req.addEventListener('load', handleResult);
        // req.addEventListener('error', handleError);

        // req.open('GET', 'http://localhost:5000/bullshit?address=' + address);
        // req.send();

        let blurbCntr = 0;
        const blurbs = [
            'Starting up the blockchain',
            'Training the models',
            'Entangling qubits',
            'Powering up IoT devices',
            'Linking docker containers',
            'Calculating buzzwords'
        ];

        const outcomes = [
            'Congratulations! Your project is grade A certified bullshit!',
            'Seems legit',
            'What even is this?',
            'You forgot a ;',
            'Excellent work from an excellent team',
            'Meh',
            'Did you just try to concatenate buzzwords?',
            'Give these guys the medal',
            'You have security issues',
            'It was ok. I installed a bitcoin miner in your server, hope you don\'t mind :)',
            'Please bring a front-end guy next time, your site is hideous',
        ]

        document.querySelector('.submit').style['display'] = 'none';
        document.querySelector('.loaderContainer').style['display'] = 'flex';
        document.querySelector('.loaderText').innerHTML = blurbs[blurbCntr];

        const loaderWidth = document.querySelector('.loader').offsetWidth;
    

        const interval = setInterval(() => {
            const width = getRand(20) + 10;
            const currWidth = document.querySelector('.progress').offsetWidth;

            document.querySelector('.progress').style['width'] = (width + currWidth) + "px";

            if(width > 20 && blurbCntr < blurbs.length - 1){
                document.querySelector('.loaderText').innerHTML = blurbs[++blurbCntr];
            }
    
            if(currWidth + width >= loaderWidth) {
                clearInterval(interval);
                document.querySelector('.loaderContainer').style['display'] = 'none';
                document.querySelector('.result').innerHTML = outcomes[getRand(outcomes.length - 1)];
                document.querySelector('.resultContainer').style['display'] = 'block';
            }
        }, 300);
    }

    document.querySelector('.submit').addEventListener('click', () => {
        const address = document.querySelector('.input').value
        handleSubmit(address);
    });

    document.querySelector('.reset').addEventListener('click', () => {
        document.querySelector('.resultContainer').style['display'] = 'none';
        document.querySelector('.submit').style['display'] = 'block';
        blurbCntr = 0;
        document.querySelector('.progress').style['width'] = '';
    });

    document.addEventListener('keypress', (ev) => {
        if (ev.key === 'Enter') {
            const address = document.querySelector('.input').value
            handleSubmit(address);
        }
    });
});


