# node-terminal-app-test
**Description:**

Pull issues and display from jira using terminal.

**Usage:**

    $ jira get

    Receiving data........
    https://servername/rest/api/2/search?jql=project=CCLC

    Project: CCLC

    Ticket   Title   Status   Priority  Issue URL                                      
    -------  ------  -------  --------  --------------------------
    Id-1     Title   Test     Normal    https://server/browse/Id-1
    Id-2     Title   Test     Normal    https://server/browse/Id-2
    Id-3     Title   Test     Normal    https://server/browse/Id-3
    

Command + double click on Mac on Issue URL to open it in default browser.

**Installation:**

Need global installation to work correctly. 
Might require sudo to create a symlink.

   	$ npm cache clean
    $ sudo npm install -g jira-pull-tickets@latest

**Usage:**

    $ jira get [project name] [flag]    


| Command  |  Description |
|---|---|
| jira get |  Display open tickets for default project |
| jira get -u | Open tickets for default project assigned to current user  |
|  jira get -a |  Display all tickets for default project |
|  jira get CCLC  |  Display open tickets for specified project, ex. CCLC |
|  jira init  |  Run initialization |


Flags can be combined: 
   
    $ jira get CCLC -ua   //display all tickets for CCLC project assigned to current user    

Run reinitialization in case smth is not working:              
    
    $ jira init                           

**Initialization:**

Creates .jira file to store data: server, default project and username.

Creates service in Keychain "jiraCLIuser" to safely store the password.

User inputs

    - server    - [optional], default is 'jira.designory.com'
    - project   - default project to display, ex. CCLC or CMHM
    - username  
    - password 