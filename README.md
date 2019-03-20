<h1 style="font-weight: bold">Budgie</h1>

<h3>Budgie is a full stack budget application built specifically for one time events. An example would be a budget for your vacation or for remodeling. Budgie's back end is a REST API built with Python, utilizing the Django Rest framework. Budgie's front end is built with JavaScript, leveraging the power of React.js and Bootstrap.</h3>

<h3> This repo contains Budgie's front end. You can find the API here: https://github.com/jasehackman/Capstone-Budgie-DjangoREST </h3>

<h2 style="font-weight: bold;"> Technologies Used
<h3>Development Languages and Libraries</h3>

<img src="./public/img/js.jpg"/>______<img src="./public/img/react.png"/>______<img src="./public/img/html5.jpg"/>______<img src="./public/img/css3.jpg"/>______<img src="./public/img/icons8-bootstrap-96.png"/>

<h1></h1>
<h3>Development Tools</h3>

<img src="./public/img/vs.jpg"/>______<img src="./public/img/lucid.png"/>______<img src="./public/img/github.jpg"/>


<h2>Instructions for Installing Budgie</h2>

<h4> You will need to have command line tools installed for your computer to use terminal commands.
</h4>

  * Mac users - Open your terminal and type

    ```sh
    git --version
    ```

  * Linux/Windows users, please vist the [Git page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and follow the instructions for setup

<h4>You will now need to configure your git account. In the terminal window, type</h4>

  ```sh
  git config –global user.name “You Name”
  git config –global user.email “Your Email”
  ```

#### Create a new directory to store the files in. Type this into your terminal window.

  ```sh
  mkdir budgie
  cd budgie
  git clone git@github.com:jasehackman/Capstone-Budgie-React.git
  ```

#### If you do not have Node.js installed on your machine, visit the [Node.js Download Page](https://nodejs.org/en/download/) and follow the included instructions. To ensure that it is installed correctly, in your terminal window, type

```sh
echo $PATH
```
  * Ensure that the result has the following in the $PATH

    ```sh
    /usr/local/bin
    ```
    or
    ```sh
    /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
    ```

#### You will need to go into the lib folder in your  directory and install and build npm modules. In your terminal, type

```sh
cd budgie/src/lib
npm init
npm i
```

#### From your terminal window, type Command T, then in the new tab type

```sh
cd budgie
npm start
```


<h1 style="text-align:center; font-weight: bold;">Congratulations! You are now experiencing Budgie's React.js Front End!

