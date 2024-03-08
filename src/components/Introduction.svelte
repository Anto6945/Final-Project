<script>
    export let headerText = "Ever wonder what the San Diego International Airport (SAN) Air Traffic is Like?";
  </script>
  
  <style>
    .header-text {
        text-align: center;
        font-size: 24px;
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
        height: 300px; /* Fixed height */
        overflow: hidden; /* Hide overflow content */
    }
  
    .plane {
        position: absolute;
        top: 80%; /* Place the plane vertically in the middle of the sky */
        animation: fly 5s linear infinite; /* Animation name, duration, timing function, and iteration count */
    }
  
    .oval {
        width: 150px;
        height: 42px;
        background-color: blue; /* Color of the oval */
        border-radius: 50%; /* Make the shape an oval */
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
  
    .wing {
        width: 0;
        height: 0;
        border-top: 18px solid transparent;
        border-bottom: 15px solid transparent;
        position: absolute;
        transform: translateY(-50%);
    }
  
    .left-wing {
        left: 60px; /* Adjust the left position */
        border-right: 30px solid #999; /* Triangle facing left */
        transform: rotate(270deg); /* Rotate the wing by 90 degrees */
        top: 80; /* Positioned above the oval */
    }
  
    .right-wing {
        right: -18px; /* Adjust the right position */
        border-left: 35px solid #999; /* Triangle facing right */
        transform: rotate(239deg); /* Rotate the wing by 180 degrees */
        top: calc(50% - 40px); /* Positioned further above the oval */
    }
  
    @keyframes fly {
        0% {
            left: -150px; /* Initial position, off-screen to the left */
        }
        100% {
            left: 100%; /* Final position, off-screen to the right */
        }
    }
  </style>
  
  <div class="header-text">
    <p>{headerText}</p>
  </div>
  
  <div class="sky">
    <div class="plane">
        <div class="oval"></div>
        <div class="wing left-wing"></div> <!-- Left wing -->
        <div class="wing right-wing"></div> <!-- Right wing -->
    </div>
  </div>
  