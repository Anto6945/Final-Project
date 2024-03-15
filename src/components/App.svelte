<script>
  let isClicked = false;

  function handleClick() {
      isClicked = true;
      setTimeout(() => {
          isClicked = false;
      }, 400);
  }
</script>

<style>

  .container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
  }

  /* Votre code CSS existant */

  /* Nouveau style pour le bouton d'avion */
  .plane-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: background-color 0.3s;
  }

  .plane-icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%) rotate(-45deg);
      width: 30px;
      height: 30px;
      fill: white;
      transition: transform 0.3s;
  }

  .plane-button:hover {
      background-color: #0056b3;
  }

  .plane-button:hover .plane-icon {
      transform: translateY(-50%) rotate(0deg);
  }

  /* Animation de l'avion */
  @keyframes fly {
      100% {
          transform: translate(200px, 0px);
          opacity: 0;
      }
  }

  /* Appliquer l'animation lorsque le bouton est cliqué */
  .is-clicked .plane-icon {
      animation: fly 0.8s ease both;
  }
</style>

<main>
  <div class="container">
      <!-- Bouton qui déclenche l'animation -->
      <button class="plane-button" on:click={handleClick} class:is-clicked={isClicked}>
          <!-- Icone de l'avion -->
          <svg class="plane-icon" viewBox="0 0 24 24">
              <image href="airplane-flying-svgrepo-com.svg" width="24" height="24" />
          </svg>
          <!-- Texte du bouton -->
          Book Flight
      </button>
  </div>
</main>
