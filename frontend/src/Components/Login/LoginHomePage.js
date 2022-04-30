import './Login.css'
function LoginHomePage() {
    return (
        <div>
            {/* <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"></link> */}
            <section id="services">
                <div class="container">
                    <div class="row">

                        <div class="col-md-6">

                            <div class="row albums">
                                <div class="col-md-6">
                                    <img src="images/img2.jpg" class="img-responsive" />
                                </div>

                            </div>
                        </div>

                        <div class="col-md-6">
                            <h2>What does HuskyMusic have??</h2>

                            <h3>Music</h3>
                            <p>
                            HuskyMusic is a digital music service that gives you access to millions of songs and other content from artists all over the world.
                            Basic functions such as playing music are totally free to Enjoy.
                            </p>


                            <h3>Playlists</h3>
                            <p>
                            Make a playlist for your pet, a road trip, a gym session… Anything!We suggest tracks and artists as you create and edit your playlists.
                            </p>

                            <h3>Latest Releases</h3>
                            <p>
                            Simply head over to your favorite artist and show pages and tap “Follow” in order to have their new releases appear in your What's New feed over time. What's New is rolling out to all users globally on iOS and Android over the coming weeks. Soon, you'll never miss a new release again.
                            </p>

                        </div>

                    </div>

                </div>

            </section>
            <section id="resources">
                <div class="container">
                    <div class="row">

                        <div class="col-md-4">
                            <h2>Easy to Use</h2>

                            <h2>Search</h2>
                            <p>
                            Husky Music Player helps you to find what you’re looking for with Search, including: Songs, Albums, Artists.
                            Enter your search term in quotation marks “” to narrow results to exact matches, e.g. “Let’s Dance”.
                            You can also enter any of these before your search term to narrow the results.
                            </p>


                            <h2>Navigate</h2>
                            <p>
                            With a persistent navigation, it’s more clear to the user to see what section the user are on and where they’d like to go in the website. This would also make the navigation more consistent to use across different platforms. By using a persistent navigation the user will be able to use the website instinctively without thinking about it.
                            </p>

                            <h2>Discover</h2>
                            <p>
                            Husky Music discovery features include personalized playlists such as Discover Weekly and Release Radar, suggestions for songs to add to your existing playlists, and radio stations based on tracks, artists, and albums. These dynamically change based on your listening habits or selected songs.
                            </p>
                        </div>

                        <div class="col-md-8">
                            <div class="row rotation">

                                <div class="col-md-6">
                                    <img src="images/iphone1.png" class="img-responsive" />
                                </div>

                                <div class="col-md-6">
                                    <img src="images/iphone2.png" class="img-responsive" />
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </div>
    )

}

export default LoginHomePage