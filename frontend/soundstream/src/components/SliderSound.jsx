

export const SliderSound = ({ imgConfig }) => {
    return (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">

            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="3" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={imgConfig.img1} className="d-block w-100" alt="..." />
                </div>

                <div className="carousel-item">
                    <img src={imgConfig.img2} className="d-block w-100" alt="..." />
                </div>

                <div className="carousel-item">
                    <img src={imgConfig.img3} className="d-block w-100" alt="..." />
                </div>

                <div className="carousel-item">
                    <img src={imgConfig.img4} className="d-block w-100" alt="..." />
                </div>
            </div>
        </div>
    )
}
