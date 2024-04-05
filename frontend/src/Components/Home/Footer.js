import React from 'react'
import "../../CSS/Home.css"

const Footer = () => {
  return (
    <div>

        {/* applied bootstrap class name,,,in public index.html,,, fixed bottom- does not move with page scroll, bg white, p means padding 2 */}

        <footer className = "fixed-bottom bg-white p-2"> 
            <p> © 2024 HomelyHub. All Rights Reserved.</p>
            {/* li*4 shortcut */}
            <ul className="footerlist">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Sitemap</li>
                <li>Company Details</li>

            </ul>

            <p>English(IN) ₹ INR</p>
        </footer>
    </div>
  )
}

export default Footer