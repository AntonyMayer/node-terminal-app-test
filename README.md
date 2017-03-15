# CLI to display jira issues
**Note: OS X Only**

    $ jira get

    Receiving data........
    https://servername/rest/api/2/search?jql=project=CCLC
    
    Project: CCLC

    Ticket   Title   Status   Priority  Issue URL                   
    -------  ------  -------  --------  ------------------------------
    Id-1     title   status   Normal    https://servername/browse/Id-1
    Id-2     title   status   Normal    https://servername/browse/Id-2
    Id-3     title   status   Normal    https://servername/browse/Id-3

**1. Description:**

Pull issues and display from jira using terminal.

**2. Installation:**

Need global installation to work correctly. 
Might require sudo to create a symlink.

   	$ npm cache clean
    $ sudo npm install -g jira-pull-tickets@latest

**3. Usage:**

Inside project root directory run.

	$ jira init
    
You will be asked to prompt project name (ex. CCLC or CMHM).
It creates **.jira** file that contains basic info required to form requests to Jira's server.

If it is the very first initialization of jira package it wil also ask to promt user's password to access Jira's server. 
Password will be safely stored in Keychain under the service **jiraCLIuser**. 

**3.1 Get command**

    $ jira get [project name] [flag]    


| Command  |  Description |
|---|---|
|  jira get |  Display open tickets for default project |
|  jira get -u | Open tickets for default project assigned to current user  |
|  jira get -a |  Display all tickets for default project |
|  jira get CCLC  |  Display open tickets for specified project, ex. CCLC |


Flags can be combined, ex. to display all tickets for CCLC project assigned to current user: 
   
    $ jira get CCLC -ua     

**3.2 Config command**

Default settings: 

    user: process.env.USER

Run following command to overwrite settings for current project:

	$ jira config
    
You will be asked to prompt server, project, username, password. All data (except password) will be stored in **.jira** file.

**3.3 --help**

Show available commands.