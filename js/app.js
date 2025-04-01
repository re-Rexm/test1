document.addEventListener('DOMContentLoaded', () => {
    // Wait for AFRAME to be loaded
    if (typeof AFRAME === 'undefined') {
        console.error('AFRAME not loaded');
        return;
    }

    // Create the NFT marker
    const nftMarker = document.createElement('a-nft');
    nftMarker.setAttribute('type', 'nft');
    nftMarker.setAttribute('url', 'assets/event-marker');
    nftMarker.setAttribute('smooth', 'true');
    nftMarker.setAttribute('smoothCount', '10');
    nftMarker.setAttribute('smoothTolerance', '0.01');

    // Create the event card
    const eventCard = document.createElement('a-entity');
    eventCard.setAttribute('position', '0 0 0');
    
    // Background plane
    const plane = document.createElement('a-plane');
    plane.setAttribute('position', '0 0.5 0');
    plane.setAttribute('rotation', '-90 0 0');
    plane.setAttribute('width', '1');
    plane.setAttribute('height', '1');
    plane.setAttribute('color', '#f0f0f0');
    eventCard.appendChild(plane);

    // Card container
    const cardContainer = document.createElement('a-entity');
    cardContainer.setAttribute('position', '0 0.5 0.1');
    
    // Card background
    const card = document.createElement('a-entity');
    card.setAttribute('class', 'event-card');
    card.setAttribute('position', '0 0.5 0');
    card.setAttribute('geometry', 'primitive: plane; width: 2.5; height: 1.8');
    card.setAttribute('material', 'color: #ffffff; transparent: true; opacity: 0.9');
    
    // Add text elements
    const addText = (value, yPos, scale = '1 1 1', color = 'black') => {
        const text = document.createElement('a-text');
        text.setAttribute('value', value);
        text.setAttribute('position', `-1 ${yPos} 0.1`);
        text.setAttribute('scale', scale);
        text.setAttribute('color', color);
        card.appendChild(text);
    };

    addText('Spring Culture Event', '0.7', '1.5 1.5 1.5', '#e91e63');
    addText('Location: Campus Room 101', '0.3');
    addText('Time: Today at 3 PM', '0');
    addText('Food & Drinks Available', '-0.3');
    
    // Register button
    const btn = document.createElement('a-plane');
    btn.setAttribute('class', 'register-btn');
    btn.setAttribute('position', '0 -0.7 0.1');
    btn.setAttribute('width', '2');
    btn.setAttribute('height', '0.4');
    btn.setAttribute('color', '#e91e63');
    
    const btnText = document.createElement('a-text');
    btnText.setAttribute('value', 'Register Here');
    btnText.setAttribute('position', '0 0 0.1');
    btnText.setAttribute('align', 'center');
    btnText.setAttribute('color', 'white');
    btn.appendChild(btnText);
    
    card.appendChild(btn);
    cardContainer.appendChild(card);
    eventCard.appendChild(cardContainer);
    nftMarker.appendChild(eventCard);

    // Add to scene
    document.querySelector('a-scene').appendChild(nftMarker);

    // Hide loader when AR is ready
    window.addEventListener('arjs-nft-loaded', () => {
        document.querySelector('.arjs-loader').style.display = 'none';
    });
});
