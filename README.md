# node-terminal-app-test
**Description:**

Pull issues from jira using terminal.

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