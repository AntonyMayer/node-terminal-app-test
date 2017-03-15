# CLI to display jira issues

**Note: Mac OS only**

    $ jira get

    Receiving data........
    https://servername/rest/api/2/search?jql=project=CCLC
    
    Project: CCLC

    Ticket   Title   Status   Priority  Issue URL                   
    -------  ------  -------  --------  ------------------------------
    Id-1     Title   Status   Normal    https://servername/browse/Id-1
    Id-2     Title   Status   Normal    https://servername/browse/Id-2
    Id-3     Title   Status   Normal    https://servername/browse/Id-3

**1. Description:**

Pull issues and display from jira using terminal.

**2. Installation:**

Need global installation to work correctly. 

    $ npm install -g jira-pull-tickets@latest

**3. Usage:**

Before using run:

	$ jira init
    
You will be asked to prompt 

- **server** - ex. https://jira.servername.com

- **project name** - ex. CCLC, CMHM or any other project name - it will be used as default (current) project to display issues (tickets)
- **[username]** - jira's username, if left blank process.env.USER will be used
- **password** - user's password for jira's server.

Password will be safely stored in Keychain under the service **jiraCLIuser**. 

After init jiraCLI creates **jiraCLI.json** file at */Users/username/Library/JiraCLI* that contains basic info required to form requests to Jira's server.

**4. Commands**

**4.1 Get**

Basic command that displays all issues with status different from "Complete" or "Done" for default project (set during init).

    $ jira get [project name] [flag]    


| Command  |  Description |
|---|---|
|  jira get |  Display open tickets for default project |
|  jira get -u | Open tickets for default project assigned to current user  |
|  jira get -a |  Display all tickets for default project |
|  jira get CCLC  |  Display open tickets for specified project, ex. CCLC |


Flags can be combined: 
   
    $ jira get CCLC -ua   //display all tickets for CCLC project assigned to current user    

**4.2 Project**

Used to change default project. 

 	$ jira project

Another option to change default project is to update it manually at */Users/username/Library/JiraCLI/jiraCLI.json*.

**3.3 --help**

Show available commands.