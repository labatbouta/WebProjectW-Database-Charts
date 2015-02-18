
webwareproj3
============
This project explores the application server environment and multiple subsystem structures required to generate a well-implemented solution. 
In this project the following technologies are used: node container (node.js) ,the “express” node module for web server instantiation, the “jade” node module for dynamic web template content.

to run the application: ./bin/www

The flow of the application is as follows:

A jade renders and html file.
The HTML page references 2 stylesheets. 1 on the server and 1 pointed at another server(bootswatch.com).
The HTML page references 1 AJAX library I made and an external JQuery Library.
When the client selects a button in the traffic chart or traffic graph div, the JS requests new text to be read on the server and then  rendered from the server into a given container.
The form in the left div allows for users to input data and then when the submit button is pressed the data is sent to the server 
and the server posts the information into the database given a query and the data the user has entered on the client side.
When the data is entered into the database the server then sends a get request to retrieve new data and then send a JSON string of
the new data to the client where the information is updated in the highchart fragment.


1)A list of page fragments and templates
    a)#container : this container is a fragment for accidents in Massachusetts chart showing data from accident deaths and crashes in Louisiana and Massachusetts
                    depending on which button is selected in the given div.
    b)#content : this container is a fragment for accidents in a pie chart showing data for teen accidents with different ages or all age
                car accident distribution depending on which button is selected by the user.
    c)#trafficCommute : this is a fragment that displays the information about car speeds on local highways and is updated everytime a user
                        enters new data in the sidebar with the average rate.
                        
    *** All fragments  above retrieve data from the server where the server sends a get request with a given query to the database. The data sent
        to the client side is in the form of a JSON string initially. Additionally, it is only the highcharts that are displayed in each of 
        these containers.
  d)dashboard.jade: is the main file that is rendered on creating the dashboard. It is composed of six containers inside of a main parent
                    container. This div is only rendered on being created. Inside of the six divs is where the fragments lay.
  e)layout.jade : is the container that has the whole project in the template including the libraries and inclusive of the js files.
  f)leftdiv.jade, rightdiv.jade, and bottomdiv.jade: are templates that exist in different containers. Each of these templates is where
                                                    the paragraph information is rendered after it is read from the text file. 
                                                    

2) A list of the JavaScript files you have created or modified
      Only one Javascript file has been created called myscript.js. This file is where all buttons are set and all AJAX's commands and post
      are send and recieved. This file is also where the highcharts are set and information is either sent or retrieved from the server depeneding 
      on the part of the code.
3) A list of URL mappings and the functions they implement
      /text/sidebar.txt This url mapping is used to read txt file and render it in a jade template to be displayed on webpage for sidebar.txt
      /text/leftdiv.txt This url mapping is used to read txt file and render it in a jade template to be displayed on webpage for leftdiv.txt
      /text/bottomdiv.txt This url mapping is used to read txt file and render it in a jade template to be displayed on webpage for bottomdiv.txt
      /teentrafficThis url mapping is used to get information from the database about percent of accidents of different teen ages.
      /traffic : This  url mapping is used to get information from the database about fatal accidents and deaths for drivers in massachusetts
                over the past 7 years.
      /speed : This url mapping is used to get information from the database about the speed of different routes traveled in massachusetts
      /accidentAllAge : This url mapping is used to get information from the database about percent of accidents of different age
                        groups.
      /Louisiana : This url mapping is used to get information from database about Louisiana's accidents over the past 7 years
      /addUserData : This url mapping is used to get user information and post it to the database.
      / : This accesses the main webpage the Dashboard
4) A description of sub-applications and how they are called from the
  main application
  
  All subapplications such as highcharts and paragraphs are called from main application using AJAX commmands to server using url mapping.
