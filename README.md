#npm i<br>
#npm start<br>
_______________________________________________________________________________________________
<br>
Update 18.05
For today I have fixed these bugs: <br>
1) On CartPage after you change the currency the price and tax fields are changing.<br>
2) On CartPage after you increase the amount of goods, the number above the cart icon is changing to a real amount.<br>
<br>
<br>
Well. i tried my best, probably for now it is the biggest proect that I have done. I gave all myself to deal with <br>
this project, but there is the riddle I didn't solve...it is attributes that must appears dynamicaly, but they <br>
aren't. I tried my best to solve it but still it wasn't enough, probably wasn't enough experience as I still <br>
learn React, and I have spent for learning only a month with a one week.<br>
And I didn't ask anyone for help, so I did really felt lack of help and mentorship...I wish I have a friend programmer <br>
who can help, but I don't, that is why it was the biggest programming chalange for me. I don't know if it will  <br>
be enough for you, but nevertheless you can be sure that I have put my soul into this project and have done <br>
my best and will do the same if I get the job!<br>
Anyway thank you for this chance!<br>
<br>
<br>
<br>
_______________________________________________________________________________________________
<br>
Update 17.05
For today I have fixed these bugs: <br>
1) All eslint errors and warnings are fixed.<br>
2) When you reload the Tech page, you will stay on that page and category.<br>
3) Improved render methods. All loops are moved, callbacks, and conditional statements moved into separate methods<br>
4) Cart Overlay backdrop is darker. The product title color on PLP is darker.<br>
5) The selected color swatch have a space between the box and the green border.<br>
6) When you reload the PDP, there is no more errors and crashes, so my main bug is fixed! <br>
<br>
<br>
For tomorrow i will try work with hardcode in the attributes. Will try to do the code more dynamic.
<br>
<br>
<br>
_______________________________________________________________________________________________
<br>
Update 16.05
For today I have fixed 10 bugs, such as: <br>
1) The "Category name" label is representing now the category name.<br>
2) Currency Switcher items aren't hardcoded. It is fetched from the currency list from the API.<br>
3) The category list isn't hardcoded. It is fetched from the API.<br>
4) Cart Overlay now can be closed on click outside the component.<br>
5) Page elements aren't accessible under the Cart Overlay backdrop.<br>
6) The out-of-stock products now are visible on PDP.<br>
7) All image thumbnails are rendered on PDP.
8) Cart Overlay is closing when a customer is navigated to the Cart page.<br>
9) Products are fetched for the current category only.<br>
10) DangerouslySetInnerHTML is dangerous and is no longer appears in code.<br>
<br>
_______________________________________________________________________________________________
<br>
Before you run the project be sure the DB is working and run on port localhost:4000.<br>
<br>
The project took me a five full work days, which is around 40hours in sum.<br>
BUT, before I even start it, I have spent around 3 weeks studying the React as I didn't<br>
have much knowledge about this technology.<br>
For this month I have studyed lots of usefull thing, such as: <br>
1) How to fetch Data using Apollo Client from GraphQL DB<br>
2) How to use Styled Components<br>
3) Some of Cycles of ReactJS LifeSycle<br>
4) Found out that React doesn't like images from your device and you should require them to use it properly<br>
5) How to work with Class Components<br>
6) How to work with this.state<br>
7) How to uplift and drop props between components<br>
8) Basics of React-Router manipulations and so else, so on. <br>
<br>
      Also some special features which had to be performed:<br>
      1) Ability to add/remove products and change their amounts in cart - on the cart page itself, PLP and PDP should be provided.<br>
      2) For products that have various options (attributes) - the options should be selected.<br>
      3) The selected options of added to cart products should be visible in cart overlay and in cart page.<br>
      4) If an attribute is a swatch attribute (type = swatch), a representation of the value should be rendered on PDP and PLP,<br>
         rather than text description (e.g. the color itself, not "Blue" or "0000FF").<br>
      5) Filtering products by category name for all of the categories from BE.<br>
      6) The descriptions provided in HTML format should be parsed and presented as HTML, not as plain text.<br>
      7) Ability to change the currency of the store to one of the available currencies.<br>
      8) CURRENCY SWITCHER:<br>
            a. Currency Switcher list should close on click outside the component.<br>
            b. Currency Switcher icon should change on currency select.<br>
            c. Currency Switcher items should be highlighted.<br>
            d. Currency Switcher should close on currency select.<br>
      9) Cart item total quantity badge on the cart icon should display the total cart item quantity not the cart item count.<br>
      10) Add a product to the cart with first selected attributes as defaults. <br>
      11) Possible to add the same product to the cart with different attributes.<br>
      12) Product with same attributes can stack in the cart, while a product with different attributes appears as separate cart items.<br>
      13) Product brand and product name are joined together and rendered on the same line.<br>
      14) Cart Overlay has a scrollbar.<br>
      15) Arrows are visible only when there are multiple images in CartPage.<br>
<br>
For me it was a long road to finish this project, I was about to quite it almost every of each last five days.<br>
The problems and bugs was haunting me and I couldn't help myself, but still I was trying my best and finished it <br>
even not in a full month, maybe in a 27 days))<br>
<br>
There are some of photos of it:<br>

![PLP](https://user-images.githubusercontent.com/87814580/168812651-978f9dd8-065e-4334-a662-ecef62076a9e.jpeg)
![PDP](https://user-images.githubusercontent.com/87814580/168812666-46913533-345f-4243-9550-d7278d0d2f61.jpeg)
![CartPage](https://user-images.githubusercontent.com/87814580/168812685-13ab475d-e46a-42fb-834d-3c83cc0a0ca0.jpeg)


<br>

