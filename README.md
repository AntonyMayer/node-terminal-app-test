# node-terminal-app-test
**Description:**

Pull issues and display from jira using terminal.

**Usage:**

    jira get
    Receiving data........
    https://track.designory.com:8443/rest/api/2/search?jql=project=CMHM

    Project: CMHM

    Ticket   Title                                                           Status       Priority  URL                               Issue URL                                      
    -------  --------------------------------------------------------------  -----------  --------  --------------------------------  -----------------------------------------------
    CMHM-64  [Visual] - Access and Support Pages - Design                    In Progress  Normal    /                                 https://track.designory.com:8443/browse/CMHM-64
    CMHM-60  [Functional] Register - Remove page refresh after error pop up  In Progress  Normal    /hcp/msi-h/register-for-updates/  https://track.designory.com:8443/browse/CMHM-60
    CMHM-18  [Visual][iPhone 5s] - homepage - font / spacing                 In Progress  Normal    /hcp/msi-h/                       https://track.designory.com:8443/browse/CMHM-18

    

Command + double click on Mac on Issue URL to open it in default browser.

**Installation:**

Need global installation to work correctly. 
Might require sudo to create a symlink.

    npm cache clean
    sudo npm install -g jira-pull-tickets@latest

**Commands:**

    jira get [project name] [flag]    

Display open tickets for default project:

    jira get 

Open tickets for default project assigned to current user:

    jira get -u                

Display all tickets for default project: 
    
    jira get -a                         

Display open tickets for specified project, ex. CCLC:

    jira get CCLC    

Flags can be combined: 
   
    jira get CCLC -ua   //display all tickets for CCLC project assigned to current user    

Run reinitialization in case smth is not working:              
    
    jira init                           

**Initialization:**

Creates .jira file to store data: server, default project and username.

Creates headers for cookie-based authentication.

User inputs

    - server    - [optional], default is 'https://track.designory.com:8443'
    - project   - default project to display, ex. CCLC or CMHM
    - username  
    - password 