import express from "express";
import { Types } from "mongoose";

import Drinks from "../models/drink";
import drinkCategories from "../models/category";
import { IDrink } from "../interfaces/drink";
import { ICategory } from "../interfaces/category";

const initDrinksRouter = express.Router();

initDrinksRouter.post("/", async (req, res) => {
  const Categories: Array<string> = [
    "VODKA",
    "GIN",
    "RUM",
    "TEQUILA",
    "LIQUEUR",
  ];

  const CategoryIds: Array<string> = [];

  for (let i = 0; i < Categories.length; i++) {
    const Category: ICategory | null = await drinkCategories.findOne({
      title: Categories[i],
    });

    const id: Types.ObjectId = Category!._id!;

    CategoryIds.push(id.toHexString());
  }
  const drinks: Array<IDrink> = [
    {
      title_kor: "앱솔루트",
      title_eng: "Absolut Vodka",
      short_description: "Absolut Vodka는 디자인과 맛 모두에서 독보적인 아이덴티티를 갖고 있습니다.",
      flavour: "Original",
      alc: 40,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-vodka.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 앨릭스",
      title_eng: "Absolut Elyx",
      short_description: "Absolut Elyx의 모든 방울은 스웨덴 남부의 한 농장에서 자란 겨울 밀로 만들어집니다.",
      flavour: "Elyx",
      alc: 42.3,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-elyx.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 애플",
      title_eng: "Absolut Äpple",
      short_description: " Absolut Äpple은 2011년에 처음으로 전 세계에 소개된 후, 빨간 사과와 생강의 맛을 즐겨 찾는 사람들에게 환한 미소를 선물했습니다.",
      flavour: "Apple",
      alc: 40,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-apple.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 채리",
      title_eng: "Absolut Cherrys",
      short_description: " 짜릿하게 자극하는 새콤달콤한 맛을 즐긴다면 Absolut Cherrys가 제격입니다.",
      flavour: "Cherry",
      alc: 40,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-cherrys.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 시트론",
      title_eng: "Absolut Citron",
      short_description: "부드럽고 상큼한 레몬 맛 보드카가 시장을 강타하며 빠르게 베스트셀러 자리를 차지했습니다.",
      flavour: "Citron",
      alc: 40,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-citron.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 블루베리 아사이",
      title_eng: "Absolut Berri Açai",
      short_description: "유럽과 북미에서 탄생한 신선한 블루베리 맛, 서남 아시아에서 온 석류, 남미에서 찾아온 부드러운 아사이.",
      flavour: "Berri Açai",
      alc: 40,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-berri-acai.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 엑스트랙",
      title_eng: "Absolut Extrakt",
      short_description: "클래식한 스웨덴 슈납스 맛을 바탕으로 앱솔루트만의 독특한 매력을 더했죠. 그 결과로 Absolut Extrakt이 탄생했습니다.",
      flavour: "Extrakt",
      alc: 35,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-extrakt.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 라임",
      title_eng: "Absolut Lime",
      short_description: "지나치게 달지 않으면서도 라임의 자연스러운 맛이 특징인 Absolut Lime.",
      flavour: "Lime",
      alc: 40,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-lime.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 자몽",
      title_eng: "Absolut Grapefruit",
      short_description: "잘 균형 잡힌 달콤함과 신선한 과일의 풍미가 돋보이는 맛으로, 한 번 맛보면 단숨에 가장 좋아하는 Absolut 보드카로 손꼽히리라 생각합니다.",
      flavour: "Grapefruit",
      alc: 40,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-grapefruit.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 배",
      title_eng: "Absolut Pears",
      short_description: "이름 그대로예요 풍성하고 뚜렷한 배 맛 순수한 맛이죠.",
      flavour: "Pear",
      alc: 38,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-pears.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 복숭아",
      title_eng: "Absolut Apeach",
      short_description: "체리, 살구와 비슷한 복숭아는 보송보송한 솜털과 달콤한 맛으로 사랑받고 있습니다.",
      flavour: "Apeach",
      alc: 38,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-peach.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 바닐라",
      title_eng: "Absolut Vanilia",
      short_description: "바닐라의 풍미는 모든 음식을 더 근사하게 만들어줍니다.단맛을 선호하는 분들이나 독특한 반전이 있는 맛을 즐기는 분들께도 적합합니다.",
      flavour: "Vanilia",
      alc: 38,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-vanilia.png",
      categoryId: CategoryIds[0],
    },   
    {
      title_kor: "앱솔루트 스트로베리",
      title_eng: "Absolut Juice Strawberry",
      short_description: "따뜻한 날들이 오래 지속되는 스웨덴의 여름에서 영감을 얻어 잘 익은 딸기 주스로 만들었습니다.",
      flavour: "Juice Strawberry",
      alc: 35,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-juice-strawberry.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 라즈베리",
      title_eng: "Absolut Raspberri",
      short_description: "잼 향으로 가득 채워진 맛이에요. 숲에서 직접 딴 달달한 야생 라즈베리 향이 상당히 강렬합니다.",
      flavour: "Raspberri",
      alc: 38,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-raspberri.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "시락",
      title_eng: "Ciroc",
      short_description: "CÓROC은 풍미와 스타일로 가득 찬 진정으로 현대적인 보드카입니다. 매끄럽고, 장난기 가득한 세련된 CÓROC은 우수한 맛, 품질 및 재미있는 라이프스타일에 대한 약속입니다.",
      flavour: "Pure",
      alc: 40,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/ciroc.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "시락 애플",
      title_eng: "Ciroc Apple",
      short_description: "바닐라와 감귤의 향과 함께 밝은 녹색 사과의 신선한 육즙이 많은 맛을 가지고 있습니다.",
      flavour: "Apple",
      alc: 40,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/ciroc_apple.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "시락 코코넛",
      title_eng: "Ciroc Coconut",
      short_description: "코코넛과 열대 과일 풍미가 훌륭하게 주입되어 열대 지방의 진정한 맛을 선사합니다.",
      flavour: "Coconut",
      alc: 35,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/ciroc_coconut.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "시락 망고",
      title_eng: "Ciroc Mango",
      short_description: "감각적인 즐거움을 선사하는 육즙이 많은 카라바오 망고의 맛은 톡 쏘는 감귤류 및 기타 열대 풍미와 결합하여 독특한 맛과 풍미의 층을 만듭니다.",
      flavour: "Mango",
      alc: 35,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/ciroc_mango.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "시락 피치",
      title_eng: "Ciroc Peach",
      short_description: "복숭아와 다른 천연 풍미의 독특한 조화를 훌륭하게 주입하여 복숭아 풍미와 과수원 과일의 향과 맛을 선사합니다.",
      flavour: "Peach",
      alc: 35,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/ciroc_peach.png",
      categoryId: CategoryIds[0],
    },   
    {
      title_kor: "그레이구스",
      title_eng: "Grey Goose",
      short_description: "이 특별한 보드카는 프랑스 최고의 재료, 부드러운 겨울 밀 및 Gensac 샘물로 만들어집니다.",
      flavour: "Pure",
      alc: 40,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/grey_goose.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "그레이구스 오랜지",
      title_eng: "Grey Goose L'Orange",
      short_description: "각 리터당 1kg의 신선한 오렌지의 천연 에센스에서 추출한 이 오렌지 맛 보드카는 오렌지의 풍미를 완벽하게 반영하는 가볍고 상쾌한 맛을 냅니다.",
      flavour: "L'Orange",
      alc: 40,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/grey_goose_le_orange.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "그레이구스 시트론",
      title_eng: "Grey Goose Le Citron",
      short_description: "이 우아하고 밝은 정신은 프랑스의 유명한 Menton 지역을 포함하여 세계에서 가장 좋은 레몬의 에센셜 오일로 가득 차 있습니다.",
      flavour: "Le Citron",
      alc: 40,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/grey_goose_le_citron.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "그레이구스 페어",
      title_eng: "Grey Goose La Poire",
      short_description: "프랑스 요리의 고전적인 맛인 배의 맛과 신선함을 반영한 이 배 향 보드카는 신선하고 부드러운 맛이 살아납니다.",
      flavour: "La Poire",
      alc: 40,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/greg_goose_la_poire.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "벨베디어",
      title_eng: "Belvedere",
      short_description: "1910년 이래로 보드카를 만들어온 세계에서 가장 오래 운영되는 폴란드 증류소 중 한 곳에서 생산되는 Belvedere의 Master Rye Distillers는 600년 폴란드 보드카 제조 역사를 바탕으로 폴란드 호밀을 독특한 맛과 특징을 지닌 특별한 보드카로 교묘하게 만들어냅니다.",
      flavour: "Pure",
      alc: 40,
      country: "폴란드",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/belvedere.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "탱커레이",
      title_eng: "Tanqueray",
      short_description: "4가지 클래식 식물로 만든 Tangueray Dry Gin의 시대를 초월한 제조법은 1830년 이후로 변함이 없습니다.",
      flavour: "Pure",
      alc: 40,
      country: "영국",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/tanqueray.png",
      categoryId: CategoryIds[1],
    },
    {
      title_kor: "비피터",
      title_eng: "Beefeater",
      short_description: "강한 시트러스 향이 어우러진 런던 드라이 진의 진수로 진의 진정한 맛을 즐기는 분들을 위한 정통 런던 드라이입니다.",
      flavour: "Pure",
      alc: 40,
      country: "영국",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/beefeater.png",
      categoryId: CategoryIds[1],
    },
    {
      title_kor: "봄베이 사파이어",
      title_eng: "Bombay Sapphire",
      short_description: "독특한 파란색 병에 담긴 세계적으로 유명한 진. 모든 방울에는 전 세계의 이국적인 지역에서 엄선한 10가지 식물이 들어 있습니다.",
      flavour: "Pure",
      alc: 40,
      country: "영국",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/bombay_sapphire.png",
      categoryId: CategoryIds[1],
    },
    {
      title_kor: "핸드릭스",
      title_eng: "Hendrick's",
      short_description: "11가지 고급 식물로 만든 특이한 진입니다. 기이하면서도 놀라운 장미와 오이의 인퓨전은 우리의 영혼에 독특하게 균형 잡힌 풍미를 불어넣어 흠잡을 데 없이 부드럽고 독특한 진을 만듭니다.",
      flavour: "Cucumber",
      alc: 41,
      country: "스코틀랜드",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/hendrick's.png",
      categoryId: CategoryIds[1],
    },
    {
      title_kor: "바카디 골드",
      title_eng: "Bacardi Gold",
      short_description: "증류 과정 후 Bacardi Gold는 부드러운 특성을 위해 독특한 숯 블렌드로 여과됩니다. 숯 여과 과정은 더 가볍고 깨끗한 럼주를 만드는 데 도움이 됩니다.",
      flavour: "Pure",
      alc: 40,
      country: "캐나다",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/bacardi_gold.png",
      categoryId: CategoryIds[2],
    },
    {
      title_kor: "바카디 슈페리어 화이트",
      title_eng: "Bacardi Superior White",
      short_description: "1862년, 10년 동안 럼을 완성한 후 Don Facundo Bacardí Massó는 자신의 BACARDÍ Superior 럼을 세상에 소개했습니다. 칵테일을 위한 숭고한 럼주로, 다른 맛을 지배하지 않으며 혼합해도 사라지지 않습니다.",
      flavour: "Pure",
      alc: 40,
      country: "푸에르토 리코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/bacardi_superior_white.png",
      categoryId: CategoryIds[2],
    },
    {
      title_kor: "캡틴 모건",
      title_eng: "Captain Morgan Original",
      short_description: "풍부한 바닐라, 흑설탕, 말린 과일, 오크의 풍미와 함께 따뜻한 향신료의 향이 어우러져 매끄러운 피니시와 완벽하게 균형 잡힌 증류주를 만듭니다.",
      flavour: "Pure",
      alc: 35,
      country: "푸에르토 리코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/captain_morgan.png",
      categoryId: CategoryIds[2],
    },
    {
      title_kor: "말리부 코코넛",
      title_eng: "Malibu Coconut",
      short_description: "말리부는 단순한 오리지널이 아니라 부드럽고 신선한 맛을 지닌 병에 담긴 햇살입니다. 그렇기 때문에 세계에서 가장 많이 팔리는 코코넛 향이 나는 카리브 럼입니다.",
      flavour: "Coconut",
      alc: 21,
      country: "캐나다",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/malibu_coconut.png",
      categoryId: CategoryIds[2],
    },
    {
      title_kor: "1800 아네호",
      title_eng: "1800 Anejo",
      short_description: "블루 웨버 용설란은 절정기에 수확되어 구리 증류기에서 이중 증류됩니다. 오크 같은 바닐라향, 토피향, 견과류, 후추 향이 나며 깊고 고급스러워 한모금 마시기에 이상적입니다.",
      flavour: "pure",
      alc: 40,
      country: "멕시코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/1800_anejo.png",
      categoryId: CategoryIds[3],
    },
    {
      title_kor: "1800 블랑코",
      title_eng: "1800 Blanco",
      short_description: "1800년에 만들어진 공식을 따릅니다. 달콤한 과일과 후추의 향이 가미된 부드럽고 균형 잡힌 맛입니다.",
      flavour: "pure",
      alc: 40,
      country: "멕시코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/1800_blanco.png",
      categoryId: CategoryIds[3],
    },
    {
      title_kor: "1800 레포사도",
      title_eng: "1800 Reposado",
      short_description: "화산 토양에서 자란 특별한 블루 웨버 용설란으로 만든 화이트 데킬라는 새로운 아메리칸 프렌치 오크 배럴에서 숙성됩니다. 그 결과 버터 같은 카라멜, 부드러운 향신료 및 약간의 스모키함이 있는 풍부한 액체가 만들어집니다.",
      flavour: "pure",
      alc: 40,
      country: "멕시코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/1800_reposado.png",
      categoryId: CategoryIds[3],
    },
    {
      title_kor: "호세 쿠엘보",
      title_eng: "Jose Cuervo Especial Gold",
      short_description: "Jose Cuervo의 스토리에는 마가리타 발명의 주도적 역할이 포함되어 있으며 여전히 사랑받는 칵테일을 위한 완벽한 데킬라입니다.",
      flavour: "pure",
      alc: 40,
      country: "멕시코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/jose_cuervo_especial.png",
      categoryId: CategoryIds[3],
    },
    {
      title_kor: "패트론 아네호",
      title_eng: "Patron Anejo",
      short_description: "12개월 이상 숙성된 오크는 마시기 좋은 데킬라를 만들어냅니다. 오크, 바닐라 및 건포도 향.",
      flavour: "pure",
      alc: 40,
      country: "멕시코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/patron_anejo.png",
      categoryId: CategoryIds[3],
    },
    {
      title_kor: "패트론 레포사도",
      title_eng: "Patron Reposado",
      short_description: "오크 향이 살짝 가미된 부드러운 맛을 위해 최소 2개월 이상 숙성. 오크와 신선한 용설란 향",
      flavour: "pure",
      alc: 40,
      country: "멕시코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/patron_reposado.png",
      categoryId: CategoryIds[3],
    },
    {
      title_kor: "패트론 실버",
      title_eng: "Patron Silver",
      short_description: "최고급 웨버 블루 용설란으로 만든 완벽한 화이트 스피릿 과일 및 시트러스 향.",
      flavour: "pure",
      alc: 40,
      country: "멕시코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/patron_silver.png",
      categoryId: CategoryIds[3],
    },
    {
      title_kor: "패트론 카페",
      title_eng: "Patron XO Cafe",
      short_description: "패트론 데킬라와 아라비카 커피의 천연 에센스를 결합한 제품, 신선한 커피 초콜릿 및 바닐라 향.",
      flavour: "pure",
      alc: 35,
      country: "멕시코",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/patron_xo_cafe.png",
      categoryId: CategoryIds[4],
    },
    {
      title_kor: "힙노틱",
      title_eng: "Hpnotiq",
      short_description: "2001년 등장으로, 시선을 사로잡는 색상과 이국적인 과일 음료, 프랑스 보드카 및 약간의 코냑의 프리미엄 블렌드로 세상의 틀을 깨뜨렸습니다.",
      flavour: "pure",
      alc: 17,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/hpnotiq.png",
      categoryId: CategoryIds[4],
    },
    {
      title_kor: "아구아 볼리비아",
      title_eng: "Agwa De Boliva",
      short_description: " 말린 과일의 요소와 함께 약간의 사향 향이 배어 있음을 감지할 수 있습니다. AGWA의 코카잎 향은 36가지 이상의 식물을 주입하고 블렌딩하여 만들어집니다. 이것은 다음 수제 칵테일을 만들 때 독특한 풍미 성분이 됩니다.",
      flavour: "pure",
      alc: 30,
      country: "네덜란드",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/agwa_de_bolivia.png",
      categoryId: CategoryIds[4],
    },
    {
      title_kor: "예거마이스터",
      title_eng: "Jagermeister",
      short_description: "56가지 식물성 성분을 블렌딩한 아이스 콜드 샷은 독창성을 한 단계 끌어올리는 사람들에게 항상 환영받고 있습니다.",
      flavour: "pure",
      alc: 35,
      country: "독일",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/jagermeister.png",
      categoryId: CategoryIds[4],
    },
  ];
  try {
    Drinks.collection.drop();

    for (let i = 0; i < drinks.length; i++) {
      await Drinks.create(drinks[i]);
    }
  } catch (err) {
    res.json({ message: "fail", err });

    return;
  }

  res.json({ message: "success" });
});

export { initDrinksRouter };
