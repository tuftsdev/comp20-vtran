ASPECTS IMPLEMENTED
- all files needed provided
- XMLHttpRequest used
- tested Loading the Data From Local Machine
("can't query for local files from JavaScript, 
a serious breach of security" - StackOverflow)
- tested with uri

COLLABORATIONS
- google
- stackoverflow
- w3schools
- MDN Web Docs
- piazza

TIME
-approx. 1 hour

IMPORTANT QUESTION
- Is it possible to request the data from a 
different origin (e.g., http://messagehub.herokuapp.com/)
or from your local machine (from file:///) 
from using XMLHttpRequest? Why or why not? 
- It is is technically possible if it is posting 
forms and linking to other domains and through 
Frames and iFrams, but in general, no, due to the 
same origin policy, which makes sure 2 pages have the 
same protocol, port, and host. It typically restricts 
cross origin reads to ensure security of information 
so that malicious websites cannot gain access to other 
personal information.