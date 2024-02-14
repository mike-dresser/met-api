# met-api

Phase 1 Project - an interface to the API of the Metropolitan Museum of Art

## MVP

This website is a viewer / portal for the Metropolitan Museum of Art collection. Selecting for European country names, or common keywords such as 'flower', 'child', or 'vase' turns up an extremely large selection of results.

Upon initial pageload, the user is presented with a randomized painting from the collection. The user can like this item, adding it to their gallery below, or click 'Random Object' to see another work. There is a search box that can be filled in with Department, Country of Origin, or a keyword search.

Within the results view, the user can like images or (if more than 18 results are available) click to see further results. Selecting items in the search or gallery boxes will bring up a larger view of the artwork, which can be dismissed by clicking again inside or outside the frame.

## Technical

The [MET Museum API](https://metmuseum.github.io/) has two query modalities: an object endpoint, which takes a 5-6 digit ID number and returns the associated record, or a search query endpoint, which returns a list of object IDs that match the query. We build a query string based on the user input--specifying only records that have images--then iterate over the resulting list, passing these to helper functions to style and display the results.

User likes are stored as a stringify'ed array in the localStorage of their browser. This information persists across sessions.

## Challenges

- Despite including the `hasImages=true` query tag by default, the API will often return records with image URLs missing due to licensing restrictions. We remove these records in the rendering phase. This explains to some degree the dearth of modern art and sculputre.
- With the goal in mind of creating and extremely simple interface, we left ouf many possible search parameters (such as the age of the work). These could be implemented at a later time.
- We are limited by the metadata of the collection itself; searching for many country names seems to return fewer results than might be expected; it is unclear if this is due to formatting, the use of older country names, or other things. Nonetheless, there is a lot to be seen!
