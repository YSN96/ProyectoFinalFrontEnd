<template>
        <Navbar />

 <section class="about section bd-container" id="about">
            <div class="about__container  bd-grid">
                <div class="about__data">
                    <span class="section-subtitle about__initial">About us</span>
                    <h2 class="section-title about__initial">We cook the best <br> COMBOI</h2>
                    <p class="about__description"><b>COMBOI </b>es una aplicación web que permite a sus usuarios crear cuentas en ella, donde pueden crear mesas de cena. El creador de la mesa invita a sus amigos compartiendo la ID de la cena, y al ingresar la ID, encuentras una página con un menú de platos a través del cual puedes pedir lo que necesitas. Al pagar, si estás invitado, no puedes pagar porque solo el creador de la mesa puede pagar la cuenta. Sin embargo, los invitados pueden cambiar sus elecciones eliminando o agregando pedidos, así como aumentar o disminuir la cantidad que han pedido.</p>
                </div>

                <img src="../assets/about.png" alt="" class="about__img">
            </div>
        </section>
</template>
    
<script>
import Navbar from '@/components/Navbar'

export default {
    name: 'vistaAbout',
    components: { Navbar},

    async mounted() {
        let token = localStorage.getItem('user-token');
        if (!token) {
            this.$router.push({ name: 'LoginView' });
        }
    },
}
</script>
<style>

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");


:root {
  --header-height: 3rem;

  --first-color: #069C54;
  --first-color-alt: #048654;
  --title-color: #393939;
  --text-color: #707070;
  --text-color-light: #A6A6A6;
  --body-color: #FBFEFD;
  --container-color: #FFFFFF;

  --body-font: 'Poppins', sans-serif;
  --biggest-font-size: 2.25rem;
  --h1-font-size: 1.5rem;
  --h2-font-size: 1.25rem;
  --h3-font-size: 1rem;
  --normal-font-size: .938rem;
  --small-font-size: .813rem;
  --smaller-font-size: .75rem;

  --font-medium: 900;
  --font-semi-bold: 600;


  --mb-1: .5rem;
  --mb-2: 1rem;
  --mb-3: 1.5rem;
  --mb-4: 2rem;
  --mb-5: 2.5rem;
  --mb-6: 3rem;


  --z-tooltip: 10;
  --z-fixed: 100;
}

@media screen and (min-width: 768px){
  :root{
    --biggest-font-size: 4rem;
    --h1-font-size: 2.25rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.25rem;
    --normal-font-size: 1rem;
    --small-font-size: .875rem;
    --smaller-font-size: .813rem;
  }
}


*,::before,::after{
  box-sizing: border-box;
}


body{
  margin: var(--header-height) 0 0 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  background-color: var(--body-color);
  color: var(--text-color);
  line-height: 1.6;
}

h1,h2,h3,p{
  margin: 0;
}


img{
  max-width: 100%;
  height: auto;
}

.section{
  padding: 4rem 0 2rem;
}

.section-title, .section-subtitle{
  text-align: center;
}

.section-title{
  font-size: 3rem;
  color: var(--title-color);
  margin-bottom: var(--mb-3);
}

.section-subtitle{
  display: block;
  font-size: 2rem;
  color: var(--first-color);
  font-weight: var(--font-medium);
  margin-bottom: var(--mb-1);
}


.bd-container{
  max-width: 960px;
  width: calc(100% - 2rem);
  margin-left: var(--mb-2);
  margin-right: var(--mb-2);
}

.bd-grid{
  display: grid;
  gap: 1.5rem;
}



.about__data{
  text-align: center;
}

.about__description{
  margin-bottom: var(--mb-3);
  font-size: 1.43rem;
}

.about__img{
  width: 280px;
  border-radius: .5rem;
  justify-self: center;
  box-shadow: 0 2px 4px 0 rgb(14, 13, 13), 0 1px 6px 0 rgb(116, 116, 116);
}



@media screen and (min-width: 576px){
  .about__container{
    grid-template-columns: repeat(2,1fr);
    align-items: center;
  }

  .about__data, .about__initial{
    text-align: initial;
  }

  .about__img{
    width: 380px;
    order: -1;
  }

}

@media screen and (min-width: 768px){
  body{
    margin: 0;
  }

  .section{
    padding-top: 4rem;
  }

}

@media screen and (min-width: 960px){
  .bd-container{
    margin-left: auto;
    margin-right: auto;
  }

  .about__container{
    column-gap: 7rem;
  }
}

</style>

  