"use client";

import Link from "next/link";
import StatsImage from "@components/StatsImage";
import BackgroundVideo from "@components/BackgroundVideo";

export default function Home() {

  return (
    <>
      <section className='w-full flex-center justify-center flex-col p-10 pt-10 sm:pl-10 z-50'>  
        <BackgroundVideo />
        {/* <div className="custom_object">
          <svg height="100%" width="100%" version="1.1" viewBox="0 -25 380 480" xmlns="http://www.w3.org/2000/svg"><g id="head" transform="translate(82.000000, 0.000000)"><g id="Head/Front/Short-Beard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Head" transform="translate(54.000000, 31.000000)" fill="rgb(148, 210, 189)"><path d="M8.26227388,34.4901268 C3.65436435,29.0813759 0.535634794,22.4528771 1.05677633,15.0254539 C2.55833022,-6.37502057 32.3485306,-1.66718886 38.1433414,9.13393292 C43.9381521,19.9350547 43.249578,47.3329958 35.7603014,49.2634576 C32.7735882,50.033323 26.4110012,48.1474609 19.935372,44.244306 L24,73 L0,73 L8.26227388,34.4901268 Z"></path></g><path d="M75.1353054,48.388929 C76.0539893,61.1861055 78.4841513,67.5846937 82.4257914,67.5846937 C88.3385979,67.5846937 93.355194,63.8310443 95.9495915,63.8310443 C97.8408192,63.8310443 97.4185661,66.1977405 96.1649615,67.9524776 C95.1306973,69.4001921 90.0939174,70.7956158 90.0939174,73.0400595 C90.0939174,75.2845031 94.0733913,73.5481008 94.0733913,74.8792364 C94.0733913,77.0810973 94.7727779,81.2209894 90.9512241,81.2209894 C87.0836843,81.2209894 75.9947625,79.8115837 74.0944216,74.0714721 C72.8679972,70.366972 72.0750257,62.6905548 71.7155071,51.0422204 C71.4808897,51.0143412 71.2421196,51 71,51 C67.6862915,51 65,53.6862915 65,57 C65,58.6822183 65.6922919,60.2027431 66.807515,61.292214 C65.4191964,63.2518162 63.8632894,65.2988831 62.0803863,67.4111902 C55.3824054,63.3926741 50.4121226,51.6289713 56.9604861,40.3282783 C58.7704744,34.7922446 62.8680346,31.8352408 67.7073518,30.4622091 C71.6274481,28.8224203 75.6968791,28.6375327 79.1320584,29.6205713 C85.8659611,30.1981637 91.8790132,32.2515132 93.5831606,33.4709469 C93.5831606,39.8461712 92.3478701,41.7376815 81.7968056,41.5709519 C79.204238,42.9401362 77.2112029,45.2978697 75.1353054,48.388929 Z" id="Hair" fill="rgb(233, 216, 166)"></path></g></g><g id="bottom" transform="translate(0.000000, 187.000000)"><g id="Bottom/Standing/Baggy-Pants" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="Leg" fill="rgb(148, 210, 189)" points="134 0 183.081639 124.226909 216.000898 229.25029 229 229.25029 178.673688 5.090379e-13"></polygon><path d="M124.116628,0 C123.593979,43.6541888 115.971833,102.427468 114.754071,105.148648 C113.942229,106.962768 85.9161573,130.032465 30.6758546,174.357739 L39.6290713,183.938736 C104.807511,145.935376 138.9048,124.399339 141.920937,119.330628 C146.445143,111.72756 161.1744,41.763137 173,0 L124.116628,0 Z" id="Leg" fill="rgb(148, 210, 189)"></path><g id="Accessories/Shoe/Flat-Sneaker" transform="translate(51.500000, 189.000000) rotate(50.000000) translate(-51.500000, -189.000000) translate(21.000000, 169.000000)" fill="#E4E4E4"><path d="M2.67813181,25.4019242 C1.55937727,28.3884109 1,30.6229931 1,32.1056708 C1,33.908957 1.3004142,36.5404001 1.90124261,40 C3.99318117,40 22.7937852,40 58.3030548,40 C59.768738,35.1545073 58.9226607,32.5385816 55.7648228,32.1522232 C52.606985,31.7658647 49.9837155,31.4170139 47.8950143,31.1056708 L21.6799926,19.4188835 C21.1755635,19.1940064 20.584344,19.4206282 20.359467,19.9250573 C20.35562,19.9336867 20.3518954,19.9423702 20.3482945,19.9511052 L18.6632131,24.038695 C15.7398812,25.4026522 13.3643706,26.0846307 11.5366811,26.0846307 C10.0517269,26.0846307 8.00099246,25.4849054 5.38447792,24.2854549 L5.38448339,24.285443 C4.38038273,23.8251478 3.19325534,24.2659892 2.73296014,25.2700899 C2.71312074,25.3133681 2.69483298,25.3573409 2.67813181,25.4019242 Z" id="shoe"></path></g><g id="Accessories/Shoe/Flat-Sneaker" transform="translate(208.000000, 199.000000)" fill="#E4E4E4"><path d="M2.67813181,25.4019242 C1.55937727,28.3884109 1,30.6229931 1,32.1056708 C1,33.908957 1.3004142,36.5404001 1.90124261,40 C3.99318117,40 22.7937852,40 58.3030548,40 C59.768738,35.1545073 58.9226607,32.5385816 55.7648228,32.1522232 C52.606985,31.7658647 49.9837155,31.4170139 47.8950143,31.1056708 L21.6799926,19.4188835 C21.1755635,19.1940064 20.584344,19.4206282 20.359467,19.9250573 C20.35562,19.9336867 20.3518954,19.9423702 20.3482945,19.9511052 L18.6632131,24.038695 C15.7398812,25.4026522 13.3643706,26.0846307 11.5366811,26.0846307 C10.0517269,26.0846307 8.00099246,25.4849054 5.38447792,24.2854549 L5.38448339,24.285443 C4.38038273,23.8251478 3.19325534,24.2659892 2.73296014,25.2700899 C2.71312074,25.3133681 2.69483298,25.3573409 2.67813181,25.4019242 Z" id="shoe"></path></g><polygon id="Pant" fill="#69A1AC" points="167 218.432889 228.804464 211.725327 183 2.84217094e-14 127.644073 2.84217094e-14"></polygon><path d="M43.4599581,158.900479 L84,206.885961 C126.699953,160.249961 151.594137,129.819963 158.682552,115.595966 C165.770967,101.37197 172.143091,62.839981 177.798925,0 L115.478146,0 C112.388642,55.2838742 110.306102,84.2121259 109.230525,86.7847551 C108.154948,89.3573843 86.2314253,113.395959 43.4599581,158.900479 Z" id="Pant" fill="#89C5CC"></path></g></g><g id="torso" transform="translate(22.000000, 82.000000)"><g id="Body/Jacket-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M198,77.6170876 L234.234567,61.7041739 C240.582018,55.3790221 246.711387,50.5716141 252.622674,47.2819501 C254.390261,46.7192094 257.410101,46.5491987 254.188168,51.2551684 C250.966235,55.961138 247.78889,61.0560141 249.076289,62.7052963 C250.363689,64.3545786 254.093006,62.5342201 255.566345,65.2162765 C256.548571,67.0043141 250.262286,69.1431805 236.707491,71.6328758 L209.56994,92.4392868 L198,77.6170876 Z M51.5082829,82 L72,86.0658446 C51.3920824,124.471059 40.3404263,144.825845 38.8450319,147.130202 C35.4803944,152.315007 38.6196693,161.817238 39.7793043,166.821179 C32.5044044,168.51462 35.3734014,157.565005 26.1671562,159.851185 C17.7641225,161.937904 10.6393632,167.293169 2.8038784,160.07074 C1.84055159,159.182785 1.13535082,156.407288 4.41981989,154.983749 C12.6026301,151.437195 24.6920431,144.796343 26.6523424,142.218096 C29.3255608,138.702197 37.6108743,118.629498 51.5082829,82 Z" id="Skin" fill="rgb(148, 210, 189)"></path><path d="M123.280247,9.87718027 L131.765198,7.64600959 C152.120135,24.2050747 163.602366,67.2616718 176.61267,71.9556463 C188.913385,76.3936093 205.208593,69.6320097 224.503164,60.7390322 L231.796052,73.8353428 C215.409826,95.0000245 178.298612,114.916545 161.84294,106.839809 C135.533742,93.9267871 125.046804,40.501408 123.280247,9.87718027 Z" id="Coat-Back" fill="#DB2721" transform="translate(177.538150, 58.161768) rotate(5.000000) translate(-177.538150, -58.161768) "></path><path d="M90,114 C124.671756,114 150.175573,114 166.511451,114 C170.007634,114 169.348845,108.951637 168.84345,106.404206 C163.010588,77.0037663 140.241304,45.3115155 140.241304,3.4607303 L118.1718,0 C99.917485,29.3584068 93.6048263,65.5045499 90,114 Z" id="Shirt" fill="#DDE3E9"></path><path d="M82.3687546,84.2331696 C66.7713811,112.367832 53.6609446,132.623442 43.0374452,145 L27,141.85882 C37.3305927,77.7906722 67.2466105,30.5043988 116.748053,3.81764932e-14 L117,2.9470116e-14 L125.486398,0 C145.298923,67.5369477 150.760885,112.536948 141.872285,135 L73,135 C74.0896281,118.56345 77.5833963,101.181199 82.3687561,84.2331662 Z" id="Coat-Front" fill="#FF4133"></path></g></g></svg>
        </div>    */}
          <h1 className='head_text text-center'>Pocket Guide to the <br /><span className='custom_font'>Prices</span> of Life.</h1>
          <Link href="/map" >
            <div className="flex justify-center mt-10">
              <button className='button text-center'>EXPLORE 🡢</button>
            </div>
          </Link>
          <h2 className="text-5xl mt-20 z-50 relative text-center">Unleash Your Inner Nomad</h2>
          <p className="pt-10 text-2xl text-center">Deciding to explore the earth shouldn’t cost the earth! Can you afford that splendid solitude in Siberia or the charming chateaus of France? We’re here to turn your dreams into reality. With Nomadify, you're just a click away to know your cost.</p>
          <div className="sm:block md:flex flex-wrap justify-center grid mt-2">
            <StatsImage icon="/assets/icons/globe_pink.png" count={200} count_start={132} label="countries" />
            <StatsImage icon="/assets/icons/cost_pink.png" count={53} count_start={23} label="items/services" />
            <StatsImage icon="/assets/icons/currency_pink.png" count={17} count_start={4} label="currencies" />
            <StatsImage icon="/assets/icons/city_pink.png" count={8000} count_start={1274} label="cities" />
          </div>
      </section>
    </>
  )
}