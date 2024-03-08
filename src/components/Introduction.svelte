<div class="header-text">
    <p>Ever wonder what the San Diego International Airport (SAN) Air Traffic is Like?</p>
</div>

<div class="sky">
    <div class="plane">
        <div class="oval"></div>
    </div>
</div>

<style>
    .header-text {
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        margin: 20px auto; /* Center the text horizontally */
        border: 2px solid gold; /* Add a border around the text */
        padding: 10px; /* Add padding to create space between text and border */
        font-family: Arial, sans-serif; /* Change font to Arial */
        display: inline-block; /* Make the element behave like an inline block */
        max-width: 80%; /* Set a maximum width for the container */
    }

    .sky {
        position: relative; /* Position relative to contain the plane */
        width: 100%;
        height: 100%; /* Fill the height of the header-text */
        overflow: hidden; /* Hide overflow content */
    }

    .plane {
        position: absolute;
        top: 50%; /* Place the plane vertically in the middle of the sky */
        animation: fly 29s linear infinite; /* Animation name, duration, timing function, and iteration count */
    }

    .oval {
        width: 150px;
        height: 50px;
        background-color: blue; /* Color of the oval */
        border-radius: 50%; /* Make the shape an oval */
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    @keyframes fly {
        0% {
            left: -100px; /* Initial position, off-screen to the left */
        }
        100% {
            left: 1000%; /* Final position, off-screen to the right */
        }
    }
</style>
