<div class="header-text">
    <p>Ever wonder what the San Diego International Airport (SAN) Air Traffic is Like?</p>
</div>

<div class="sky">
    <div class="plane"></div>
</div>

<script>
    // JavaScript code can go here if needed
</script>

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
    }

    .plane {
        width: 0;
        height: 0;
        border-left: 50px solid transparent; /* Left wing */
        border-right: 50px solid transparent; /* Right wing */
        border-bottom: 20px solid blue; /* Body */
        position: absolute;
        left: -100px;
        top: 50%; /* Place the plane vertically in the middle of the header */
        transform: translateY(-10%); /* Adjust for vertical centering */
        animation: fly 4s linear infinite; /* Animation name, duration, timing function, and iteration count */
    }

    @keyframes fly {
        0% {
            transform: translateX(-100%); /* Initial position, off-screen to the left */
        }
        100% {
            transform: translateX(100%); /* Final position, off-screen to the right */
        }
    }
</style>
