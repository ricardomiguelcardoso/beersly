# Beersly

## Instructions:
- Install dependencies
    - npm install
- Run project
    - npm run dev 

### About

This was made with nextjs and axios.

### What does it do?
- Shows beers from punkapi
- You can add your own beers. Click "add beer" button. They will be stored in local storage.
- Beers can be sorted by Recent, Oldest, Name and Date Brewed. Use the dropdown on the left.
    - Recent and Oldest use the id to sort.
    - Date uses frist_brewed.
- Click any beer to see more details. It will redirect to the beer details page.

#### Technical Details
- Beers details page
    - Theres a separation between beers from the api and beers from local storage. This was needed to use server side rendering for api beers and client side rendering local beers, since the latter needs access to client side.
    - /beers/[id] is for api beers.
    - /beers-device/[id] is for local storage beers.
- All css is in the styles folder.
- All components are in the components folder. 
- All pages use the layout component. That way the header is the same across all website.
