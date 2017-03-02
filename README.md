# node-terminal-app-test
**Description:**

Pull issues and display from jira using terminal.

Command + double click on Issue URl to open it in default browser.

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

Display open tickets for specified project (ABC):

    jira get ABC    

Flags can be combined: 
   
    jira get ABC -ua    

Run reinitialization in case smth is not working:              
    
    jira init                           

**Initialization:**

User inputs

    - server    - [optional], default is 'https://track.designory.com:8443'
    - project   - default project to display, ex. CCLC or CMHM
    - username  
    - password 