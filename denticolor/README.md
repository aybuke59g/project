# DentiColor
#### Video Demo: https://youtu.be/RUEF3NooNyk
#### Description:
This program is designed with the purpose of assisting dentists and dental students in accurately determining the tooth color for their patients. It functions by identifying the average RGBA color values of a selected area comprising 25 pixels upon hover. Subsequently, these values are converted into LAB color values, allowing for a precise comparison with pre-existing data in order to identify the optimal color match.

#### Usage:
"DentiColor" is an innovative online platform designed for dental professionals and researchers to accurately analyze and compare color values of teeth using uploaded images. By registering and signing in, users gain access to a comprehensive suite of tools and features that streamline the process of evaluating teeth coloration and compiling valuable data for research and clinical purposes.

- Register, log in, and access the dashboard.
- Upload a teeth image for analysis.
- Use the pointer tool to hover over pixels at the middle of the tooth.
- Avoid corners and edges for accurate color readings.
- Find a color match.

#### Structure of the Program
It is written using the Flask framework and includes CSS, JavaScript, Python, and HTML files. Bootstrap is used for styling. Pictures are sourced from Adobe Firefly.
Files:
- `convert.py`: This file takes values from the JSON file via `app.py` and converts RGBA values first to XYZ coordinates and then to LAB values. It then compares them to existing data in `users.db`.
- `users.db`: Contains data about user accounts and color values in tables.
- `image_up.js`: This file is responsible for image uploading and pixel selections. The file is called when a user uploads an image and selects a pixel. It calculates the average RGBA color values of 25 pixels around the hovered pixel and stores them in a JSON file for later use.
- `index.html`: This file creates an interface for users to upload images, select colors, and display color match results.
- `home.html`: The homepage of the website provides usage steps and requirements with images.

There are other supporting files as well.

#### Credits
###### Learning Resources
- [https://github.com/miguelznunez](https://github.com/miguelznunez)
- "A Digital Shade-Matching Device for Dental Color Determination Using the Support Vector Machine Algorithm" by Minah Kim, Byungyeon Kim, Byungjun Park, Minsuk Lee, Youngjae Won, Choul-Young Kim, Seungrag Lee
- [https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas#a_color_picker](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas#a_color_picker)

###### Artwork and Design
- [https://memegen.link/#images](https://memegen.link/#images)
- [https://firefly.adobe.com/inspire/images](https://firefly.adobe.com/inspire/images)
- [https://getbootstrap.com/docs/4.0/components/navbar/](https://getbootstrap.com/docs/4.0/components/navbar/)
- [https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide](https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide)

#### Future Improvements
As we continue to enhance this program, several avenues for improvement are being considered:

- Expanded Color Dataset: With a larger and more diverse color dataset, the program's color matching accuracy can be further refined, accommodating a wider range of tooth shades and variations.
- Customizable Preferences: Allowing users to customize the comparison criteria and adjust the color matching algorithm's parameters could provide more tailored results to meet specific clinical needs.
- Machine Learning Integration: Exploring the integration of machine learning techniques could enable the program to adapt and improve its color matching capabilities over time, based on user interactions and feedback.

We are committed to the ongoing development and improvement of this program to provide a cutting-edge tool for dental professionals and students. Your feedback and suggestions are highly valued as we work towards making this program even more valuable and effective.

#### Challenges
The color data existing in `users.db` may not be accurate for many color chart companies. Collaborations with these companies may provide more useful and accurate information.
The formulas used while converting color values may provide slightly different outcomes.
