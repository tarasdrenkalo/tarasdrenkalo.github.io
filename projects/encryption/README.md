# Encryption Activity Reflection

## Part 1: Key Exchange

My Key: 9
My Partner's Key: 4

Our initial shared key: 13

## Part 2: Messaging

Complete this table with each of your messages. This should 
include the entire conversation - the messages that you sent
and the messages that you received.

(If you used something other than the caesar cipher here, describe what you did)

| Encoded Message | Decoded Message | Key |
| --------------- | --------------- | --- |
|Uryyb, V'z jevgvat fbzrguvat.|Hello, Allie How are you.|13|
|Byffi, Uffcy Biq uly sio|Hello, Allie How are you.|20|
|X pb uxct, wdl pgt ndj|I am fine, how are you|15|
|We did great job!|We did great job!|0|

## Part 3: Connection to TCP/IP Model

### Application Layer: Turn your message into binary

Everything we've done in this activity takes place in the application layer. By the time the message leaves the application
layer, it is encoded in binary. We've been working with text for this activity for convenience, but let's see what the binary
looks like.

Go back to the first encrypted message that you sent (it should be in `rsa_encryption_activity/send/encrypted_message.b64`).

This message is represented as a string of letters, numbers, and symbols. But we know that the real message is in binary.

Select the first six characters from this message and copy them here:

Using the ASCII table, convert these five characters to binary (if necessary,
include leading zeroes so that each character is 8 bits): 

### Transport Layer: Break your message into packets

Assume that each packet can hold two bytes. Fill in the packet information below with the binary values you computed above.

    =========
    Packet 1:

    Source: Taras
    Destination: Alexandra  
    Sequence: 1/3
    Data: 01100101  01111010

    =========
    Packet 2:
   
    Source: Taras         
    Destination: Alexandra        
    Sequence: 2/3
    Data: 01110011  00110000 
    
    =========
   
    Packet 3:

    Source: Taras
    Destination: Alexandra
    Sequence: 3/3
    Data: 01100011  01010111    

## Part 4: Reflection Questions

* What is the difference between symmetric and asymmetric encryption? What purpose did each serve in this simulation? ***Symetric means both sender and receiver have shared secret, while assymetric means only receiver knows the private key.***
* Why is it important that this protocol uses a new key for each message? ***So if the key is replaced/revoked and if the message got intercepted by adversary, it can no longer decrypt message.***

- Why is it important that you never share your secret key? ***Sharing your secret key is like giving hackers decryption key and control over yor pc.***
- In the transport layer, do these messages use TCP or UDP? Why? ***UDP to esure all packets're delivered***
- Now that you've created packets in the transport layer, give a short explanation of what happens to these packets in the internet layer and in the link layer. ***The packets're released by the router to random direction and somehow they get to the destination.***
- This protocol successfully encrypts the **content** of the message. Even though and adversary in the middle can't read the content of the message, what other information can they still see? ***I guess they can see/infer the algorithm used in encryption (SHA-1, MD-5), extra metadata embedded to the packet***
