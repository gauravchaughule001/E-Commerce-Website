import React from 'react'
import './Carousal.css';

export default function MyCarousal() {
    return (
        <div style={{backgroundColor:"black"}}>
            <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                <div class="carousel-inner">
                    <div class="carousel-item active carousal-image-1">
                        {/* <img src="https://m.media-amazon.com/images/G/31/img21/Wireless/ssserene/OP11/GW/26thApr/_1400x800._CB591042106_.jpg" class="d-block w-100" alt="..." /> */}
                        <div class="carousal-data carousel-caption d-none d-md-block">
                            <h5>Earn Cashback Upto 5000Rs</h5>
                            <p>Buy Products in flash sale and earn rewards</p>
                        </div>
                    </div>
                    <div class="carousel-item carousal-image-2">
                        {/* <img src="https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Cheapest-5G-Phones-Amazon.png" class="d-block w-100" alt="..." /> */}
                        <div class="carousal-data carousel-caption d-none d-md-block">
                            <h5>Earn Cashback Upto 5000Rs</h5>
                            <p>Buy Products in flash sale and earn rewards</p>
                        </div>
                    </div>
                    <div class="carousel-item carousal-image-3">
                        {/* <img src="https://m.media-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungM/M14/Sale-live-now/D77911710_IN_WLME_SamsungM_M145G_Launch_catpage_1400x800._CB590368077_.jpg" class="d-block w-100" alt="..." /> */}
                        <div class="carousal-data carousel-caption d-none d-md-block">
                            <h5>Earn Cashback Upto 5000Rs</h5>
                            <p>Buy Products in flash sale and earn rewards</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
