import urllib.request
import os

logos = {
    "uoft.png": "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/200px-Utoronto_coa.svg.png",
    "cmu.png": "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Carnegie_Mellon_University_seal.svg/200px-Carnegie_Mellon_University_seal.svg.png",
    "nus.png": "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/200px-NUS_coat_of_arms.svg.png",
    "iit_patna.png": "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Indian_Institute_of_Technology_Patna_Logo.svg/200px-Indian_Institute_of_Technology_Patna_Logo.svg.png",
    "iit_kharagpur.png": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/200px-IIT_Kharagpur_Logo.svg.png",
    "iit_bhu.png": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/IIT_%28BHU%29_Logo.svg/200px-IIT_%28BHU%29_Logo.svg.png",
    "jadavpur.png": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Jadavpur_University_Logo.svg/200px-Jadavpur_University_Logo.svg.png",
    "panjab_university.png": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Panjab_University_logo.svg/200px-Panjab_University_logo.svg.png"
}

os.makedirs('assets/img/affiliations', exist_ok=True)
opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')]
urllib.request.install_opener(opener)

for name, url in logos.items():
    path = os.path.join('assets/img/affiliations', name)
    try:
        urllib.request.urlretrieve(url, path)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")
