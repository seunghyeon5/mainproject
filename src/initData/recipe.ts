import express from "express";
import mongoose from "mongoose";
import { IRecipe } from "../interfaces/recipe";
import Recipes from "../models/recipe";
import { ICategory } from "../interfaces/category";
import drinkCategories from "../models/category";

const initDrinkRecipeRouter = express.Router();

initDrinkRecipeRouter.post("/", async (req, res) => {
  const Categories: Array<string> = [
    "VODKA",
    "GIN",
    "RUM",
    "TEQUILA",
    "LIQUEUR",
  ];
  const CategoryIds: Array<mongoose.Types.ObjectId> = [];

  for (let i = 0; i < Categories.length; i++) {
    const Category: ICategory | null = await drinkCategories.findOne({
      title: Categories[i],
    });

    const id: mongoose.Types.ObjectId = Category!._id!;
    CategoryIds.push(id);
  }

  const drinkRecipes: Array<IRecipe> = [
    /*
        {
          title: "Old Fashioned",
          image:
            "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/old_fashioned.png",          
          ingredients: [
            "갈설탕",
            "비터즈 소량",
            "버본 45ml",
            "트위스트 오렌지",            
          ],
          brief_description: "락 글래스에 갈설탕(백설탕) 및 비터즈를 넣고 으깬다. 버본을 채운다. 오랜지로 장식한다.",
          keywords: "클래식 버본 비터즈 오렌지 온더락 각설탕",          
        },
        */
    {
      title: "Vodka Sour",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/vodka_sour.png",
      ingredients: [
        "보드카/45ml",
        "레몬 주스/30ml",
        "슈가 시럽/15ml",
        "비터즈 소량",
        "계란 흰자/15ml",
        "칵테일 체리",
        "웨지 레몬",
      ],
      steps: [
        "보스턴 쉐이커에 얼음을 넣는다.",
        "모든 재료를 추가.",
        "쉐이킹을 한 후 스트레이너를 사용하여 차가운 락 글래스에 따른다.",
        "체리 및 레몬으로 장식한다.",
      ],
      alc: 19,
      brief_description: "생선 및 해산물 요리와 가장 잘 어울립니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/비터즈bitters/레몬lemon/온더락rock",
      categoryId: CategoryIds[0],
    },
    {
      title: "Moscow Mule",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/moscow_mule.png",
      ingredients: [
        "얼음",
        "보드카/45ml",
        "라임 주스/30ml",
        "진저에일/40ml",
        "웨지 라임",
      ],
      steps: [
        "Mule mug에 얼음를 채운다.",
        "보드카 및 라임 주스를 넣는다.",
        "진저에일을 가득 채운다.",
        "라임으로 장식한다.",
      ],
      alc: 18,
      brief_description: "로스팅 또는 바베큐 음식과 잘 어울립니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/진저에일ginger/라임lime/Mulemug",
      categoryId: CategoryIds[0],
    },
    {
      title: "Skinny Bitch",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/skinny_bitch.png",
      ingredients: [
        "얼음",
        "보드카/40ml",
        "소다수/150ml",
        "라임 주스/15ml",
        "웨지 라임",
      ],
      steps: [
        "하이볼 글래스에 얼음를 채운다.",
        "모든 재료를 넣는다.",
        "라임으로 장식한다.",
      ],
      alc: 14,
      brief_description: "가볍고 감귤류 음료르 좋아하는 사람들에게 추천",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/소다수soda/라임lime/하이볼highball",
      categoryId: CategoryIds[0],
    },
    {
      title: "Sex On The Beach",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/sex_on_the_beach.png",
      ingredients: [
        "얼음",
        "보드카/20ml",
        "오렌지 주스/100ml",
        "크렌베리 주스/100ml",
        "복숭아 슈냅스/20ml",
        "웨지 라임",
        "칵테일 체리",
      ],
      steps: [
        "하이볼 글래스에 얼음를 채운다.",
        "모든 재료를 넣는다.",
        "라임 및 체리로 장식한다.",
      ],
      alc: 15,
      brief_description: "점심식사와 함께 가장 좋습니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/라임lime/소다수soda오렌지크렌베리/하이볼highball",
      categoryId: CategoryIds[0],
    },
    {
      title: "Espresso Martini",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/espresso_martini.png",
      ingredients: [
        "얼음",
        "보드카/40ml",
        "깔루아/20ml",
        "에스프레소/20ml",
        "커피 빈",
      ],
      steps: [
        "보스턴 쉐이커에 얼음를 채운다.",
        "모든 재료를 넣는다.",
        "쉐이킹을 한 후 스트레이너를 사용하여 차가운 칵테일 글래스에 따른다.",
        "커피 콩으로 장식한다.",
      ],
      alc: 16,
      brief_description: "저녁 식사 후 또는 늦은 밤에 어울립니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/깔루아kahlua/커피coffee에스프레소espresso/칵테일잔cocktail",
      categoryId: CategoryIds[0],
    },
    {
      title: "Long Island Iced Tea",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/long_island_iced_tea.png",
      ingredients: [
        "얼음",
        "보드카/20ml",
        "라이트 럼/20ml",
        "진/20ml",
        "데킬라 블랑코/20ml",
        "트리플 섹/20ml",
        "레몬 주스/40ml",
        "콜라/20ml",
        "웨지 라임",
      ],
      steps: [
        "하이볼 글래스에 얼음를 채운다.",
        "모든 재료를 넣는다.",
        "라임으로 장식한다.",
      ],
      alc: 21,
      brief_description: "꽤 강한 칵테일, 애프터눈 티와 잘 어울립니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        1800 Blanco Bacardi Superior White \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN/바카디bacardi캡틴모건captain말리부malibu럼rum/블랑코blanco데킬라/트리플섹triplesec/라임lime/콜라coke/하이볼highball",
      categoryId: CategoryIds[0],
    },
    {
      title: "Vodka Mojito",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/vodka_mojito.png",
      ingredients: [
        "얼음",
        "보드카/45ml",
        "슈가 시럽/20ml",
        "민트 잎",
        "웨지 라임",
        "소다수",
      ],
      steps: [
        "하이볼 글래스에 보드카, 슈가시럽, 민트잎 및 라임를 넣고 으깬다.",
        "소다수를 가득 채운다.",
        "민트잎으로 장식한다.",
      ],
      alc: 11,
      brief_description:
        "바삭하고 상쾌한 보드카 모히또는 클래식 모히또에 대한 환상적인 대안",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/라임lime민트잎mint/소다수coda슈가sugar/하이볼highball",
      categoryId: CategoryIds[0],
    },
    {
      title: "Blue Hawaiian",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/blue_hawaiian.png",
      ingredients: [
        "얼음",
        "보드카/25ml",
        "블루 큐라소/25ml",
        "코코넛 시럽/10ml",
        "파인애플 주스",
        "칵테일 체리",
      ],
      steps: [
        "하이볼 글래스에 얼음를 채운다.",
        "보드카, 블루 큐라소 및 코코넛 시럽를 넣는다.",
        "파인애플 주스를 가득 채운다.",
        "체리로 장식한다.",
      ],
      alc: 14,
      brief_description: "점심 식사와 잘 어울립니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/큐라소curacao/코코넛coconut/파인애플pineapple/하이볼highball",
      categoryId: CategoryIds[0],
    },
    {
      title: "Kamikaze",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/Kamikaze.png",
      ingredients: [
        "얼음",
        "보드카/30ml",
        "트리플 섹/15ml",
        "레몬 주스/15ml",
        "웨지 라임",
      ],
      steps: [
        "보스턴 쉐이커에 얼음를 채운다.",
        "모든 재료를 넣는다.",
        "쉐이킹을 한 후 스트레이너를 사용하여 차가운 샷 글래스에 따른다.",
      ],
      alc: 20,
      brief_description: "티 타임에 가장 좋습니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/트리플섹triplesec/라임lime레몬lemon/샷shot스트레이트straight",
      categoryId: CategoryIds[0],
    },
    {
      title: "White Russian",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/white_russian.png",
      ingredients: ["보드카/40ml", "깔루아/40ml", "크림/40ml"],
      steps: ["락 글래스에 얼음를 채운다.", "모든 재료를 넣는다."],
      alc: 21,
      brief_description: "상당히 강한 칵테일입니다. tiffin과 함께 제공됩니다.",
      keywords:
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/깔루아kahlua/크림cream/온더락rock",
      categoryId: CategoryIds[0],
    },
    {
      title: "Vodka Tonic",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/vodka_tonic.png",
      ingredients: ["얼음", "보드카/45ml", "토닉워터/150ml", "웨지 라임"],
      steps: [
        "하이볼 글래스에 얼음를 채운다.",
        "모든 재료를 넣는다.",
        "라임으로 장식한다.",
      ],
      alc: 14,
      brief_description: "모닝 티 스낵과 가장 잘 어울립니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/토닉tonic/라임lime/하이볼highball",
      categoryId: CategoryIds[0],
    },
    {
      title: "Vodka Mimosa",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/vodka_mimosa.png",
      ingredients: ["얼음", "보드카/25ml", "오렌지 주스/50ml", "샴페인"],
      steps: [
        "샴페인 글래스에 얼음를 채운다. 보드카 및 오렌지 주스를 넣는다. 샴페인를 가득 채운다.",
      ],
      alc: 18,
      brief_description:
        "편안하고 기본적인 음료와 고급스럽고 화려한 파티 칵테일의 완벽한 조합",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/샴페인champagne",
      categoryId: CategoryIds[0],
    },
    {
      title: "Screwdriver",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/screwdriver.png",
      ingredients: ["얼음", "보드카/45ml", "오렌지 주스/50ml", "웨지 오렌지"],
      steps: [
        "하이볼 글래스에 얼음를 채운다.",
        "모든 재료를 넣는다.",
        "오렌지로 장식한다.",
      ],
      alc: 12,
      brief_description: "모닝 티 스낵과 가장 잘 어울립니다.",
      keywords:
        "Absolut Vodka Absolut Elyx Absolut Äpple Absolut Cherrys Absolut Citron \
        Absolut Berri Açai Absolut Extrakt Absolut Lime Absolut Grapefruit \
        Absolut Pears Absolut Apeach Absolut Vanilia Absolut Juice Strawberry \
        Absolut Raspberri Ciroc Apple Ciroc Coconut Ciroc Mango Ciroc Peach \
        Grey Goose Grey Goose L'Orange Grey Goose Le Citron Grey Goose La Poire Belvedere \
        앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/오렌지orange/하이볼highball",
      categoryId: CategoryIds[0],
    },
    //CategoryIds[0] #13

    {
      title: "Gin Fizz",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/gin_fizz.png",
      ingredients: [
        "얼음",
        "진/45ml",
        "레몬 주스/20ml",
        "소다수/30ml",
        "슈가 시럽/15ml",
      ],
      steps: [
        "하이볼 글래스에 얼음를 채운다.",
        "모든 재료를 쉐이커에 넣고 잘 흔든다.",
        "하이볼 잔에 따라낸다.",
        "소다수를 따른다.",
      ],
      alc: 17,
      brief_description: "풍미가 강한 칵테일입니다. 점심과 가장 잘 어울립니다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/소다수soda/하이볼highball",
      categoryId: CategoryIds[1],
    },
    {
      title: "Gin Lime Sour",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/gin_lime_sour.png",
      ingredients: [
        "얼음",
        "진/45ml",
        "라임 주스/30ml",
        "라임 시럽/15ml",
        "웨지 라임",
      ],
      steps: [
        "쉐이커에 얼음의 절반만 넣는다.",
        "모든 재료를 넣고 잘 흔든다.",
        "유리잔에 모두 붓고 얼음을 채운다.",
        "라임으로 장식한다.",
      ],
      alc: 18,
      brief_description:
        "산성이 강한 칵테일입니다. 식전에 제공하여 식욕을 돋웁니다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/라임lime/온더락rock",
      categoryId: CategoryIds[1],
    },
    {
      title: "Gin Tonic",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/gin_tonic.png",
      ingredients: ["얼음", "진/45ml", "토닉워터", "웨지 레몬"],
      steps: [
        "얼음이 든 잔에 진을 따른다.",
        "토닉워터로 기호에 맞게 잔을 채운다.",
        "2-3회 젓은 다음 레몬 라임 또는 오이로 장식한다.",
      ],
      alc: 15,
      brief_description:
        "산뜻한 맛이 스포츠 후의 달아오른 몸을 시원하게 해준다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/레몬lemon/온더락rock/하이볼highball",
      categoryId: CategoryIds[1],
    },
    {
      title: "Orange Blossom",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/orange_blossom.png",
      ingredients: ["얼음", "진/60ml", "오렌지 주스/30ml", "웨지 오렌지"],
      steps: [
        "쉐이커에 재료를 얼음과 함께 잘 섞는다.",
        "오렌지로 장식을한다.",
        "냉각된 칵테일 잔에 따른다.",
      ],
      alc: 29,
      brief_description: "피로연에 잘 어울리는 칵테일이다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/오렌지orange/칵테일잔cocktailglass",
      categoryId: CategoryIds[1],
    },
    {
      title: "Pink Lady",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/pink_lady.png",
      ingredients: [
        "얼음",
        "진/30ml",
        "석류 시럽/30ml",
        "크림/10ml",
        "계란 흰자",
      ],
      steps: [
        "쉐이커 재료와 얼음을 30회 이상 잘 흔든다.",
        "냉각된 소서형 샴페인 잔에 따른다.",
      ],
      alc: 22,
      brief_description: "색상이 아름다워 여성들에게 많은 사랑을 받는다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/석류grenadine/샴페인잔sauserglass",
      categoryId: CategoryIds[1],
    },
    {
      title: "White Lady",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/white_lady.png",
      ingredients: [
        "얼음",
        "진/30ml",
        "트리플 섹/15ml",
        "레몬 주스/15ml",
        "크림/8ml",
        "계란 흰자",
      ],
      steps: ["쉐이커에 재료를 얼음과 함께 넣고 가볍게 쉐이킹한 후 잔에 제공"],
      alc: 29,
      brief_description:
        "백의의 귀부인을 연상시키는 하얀 유백색과 순수한 레몬 쥬스로 착각하기 쉬운 싫증이 나지 않는 심플한 맛 ",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/트리플섹triplesec/칵테일잔cocktail",
      categoryId: CategoryIds[1],
    },
    {
      title: "Paradise",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/paradise.png",
      ingredients: [
        "얼음",
        "진/30ml",
        "애프리콧 브랜디/15ml",
        "오렌지 주스/30ml",
        "웨지 오렌지",
      ],
      steps: [
        "쉐이커에 재료를 얼음과 함께 섞는다.",
        "소서형 샴페인 잔에 따른다.",
      ],
      alc: 25,
      brief_description:
        "맑은 오렌지색과 애프리콧 향이 잘 어울러진 살구향과 오렌지 맛이 강한 여성용 칵테일이다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/애프리콧브랜디brandyapricot/샴페인잔sauserglass",
      categoryId: CategoryIds[1],
    },
    {
      title: "Martini",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/martini.png",
      ingredients: ["얼음", "진/45ml", "드라이 베르무트/15ml", "올리브"],
      steps: [
        "믹싱글라스에 재료를 넣고 젓는다.",
        "마티니잔에 따르고 올리브로 장식한다.",
        "너무 오래 저어서 얼음이 녹는 물이적어야 산뜻한 마티니가 된다.",
      ],
      alc: 32,
      brief_description: "향긋하고 강한 쓴맛, 식전에 어울린다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/베르무트vermouth/올리브/마티니잔martiniglass",
      categoryId: CategoryIds[1],
    },
    {
      title: "Gin Rickey",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/gin_rickey.png",
      ingredients: ["얼음", "진/45ml", "라임 주스/20ml", "소다수", "웨지 라임"],
      steps: [
        "잔에 얼음 3-4개와 재료를 넣는다.",
        "차가운 소다수로 잔을 채우고 잘 휘젓는다.",
        "레몬이나 라임으로 장식한다.",
      ],
      alc: 14,
      brief_description:
        "처음 마신 사람의 이름을 따서 '진 리키'라고 불리게 되었다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/라임lime/하이볼highball",
      categoryId: CategoryIds[1],
    },
    {
      title: "Million Dollor",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/million_dollar.png",
      ingredients: [
        "얼음",
        "진/30ml",
        "스위트 베르무트/30ml",
        "파인애플 주스/30ml",
        "석류 시럽/10ml",
        "계란 흰자",
      ],
      steps: [
        "쉐이커에 재료를 넣고 잘 흔든다.",
        "얼음이 푹신한 거품처럼 될 때까지 흔든다.",
        "차가운 소서형 샴페인 글라스에 따른다.",
      ],
      alc: 15,
      brief_description:
        "1921년 일본 요코하마 그랜드 호텔에 근무하던 '하마다 마사오'씨의 작품 점심과 함께하면 최고이다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/스위트베르무트vermouth/샴페인잔sauserglass",
      categoryId: CategoryIds[1],
    },
    {
      title: "Bronx",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/bronx.png",
      ingredients: [
        "얼음",
        "진/45ml",
        "스위트 베르무트/15ml",
        "드라이 베르무트/15ml",
        "오렌지 주스/15ml",
        "웨지 오렌지",
      ],
      steps: [
        "쉐이커에 얼음과 재료를 넣고 잘 흔든다.",
        "차가운 마티니 잔에 따른다.",
      ],
      alc: 20,
      brief_description: "식전에 제공하여 식욕을 돋구어 줍니다.",
      keywords:
        "Tanqueray Beefeater Bombay Sapphire Hendrick's \
        비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/스위트베르무트vermouth/마티니잔martiniglass",
      categoryId: CategoryIds[1],
    },
    //CategoryIds[1] #11
    {
      title: "Pina Colada",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/pina_colada.png",
      ingredients: [
        "얼음",
        "라이트 럼/30ml",
        "다크 럼/15ml",
        "말리부 코코넛 럼/15ml",
        "파인애플 주스/50ml",
        "파인애플",
      ],
      steps: [
        "블렌더에 얼음과 모든 재료를 넣는다.",
        "블렌더로 곱게 갈아준다.",
        "차가운 포코그란데 글라스에 담고 파인애플 조각으로 장식한다.",
      ],
      alc: 19,
      brief_description:
        "파인애플 주스와 블렌딩되어 점심과 가장 잘 어울립니다.",
      keywords:
        "Bacardi Gold Bacardi Superior White Captain Morgan Original Malibu Coconut \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu/다크럼dark/파인애플pineapple/포코그란데글라스pocogrande",
      categoryId: CategoryIds[2],
    },
    {
      title: "Daiquiri",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/classic_daiquiri.png",
      ingredients: [
        "얼음",
        "라이트 럼/60ml",
        "라임 주스/30ml",
        "슈가 시럽/15ml",
        "웨지 라임",
      ],
      steps: [
        "쉐이커에 얼음과 모든 재료를 넣는다.",
        "잘 흔들어준다.",
        "차가운 소서형 샴페인 잔에 따른다.",
      ],
      alc: 23,
      brief_description:
        "칠레의 광산의 이름을 딴 다이커리, 애프터눈 티와 잘 어울린다.",
      keywords:
        "Bacardi Gold Bacardi Superior White Captain Morgan Original \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white/라임lime/샴페인잔sauserglass",
      categoryId: CategoryIds[2],
    },
    {
      title: "Cuba Libre",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/cuba_libre.png",
      ingredients: [
        "얼음",
        "라이트 럼/30ml",
        "콜라/60ml",
        "라임 주스/10ml",
        "웨지 라임",
      ],
      steps: [
        "하이볼 잔에 얼을을 채운다.",
        "라이트 럼과 라임 주스를 따라준다.",
        "콜라를 위에 따라주고 라임으로 장식한다.",
      ],
      alc: 12,
      brief_description:
        "큰 덩어리 고기와 어울린다. 스페인 식민지였던 쿠바의 독립운동 당시에 생겨난 Viva Cuba Libre라는 표어에서 유래된 이름이다.",
      keywords:
        "Bacardi Gold Bacardi Superior White Captain Morgan Original \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white/라임lime/콜라coke/하이볼highball",
      categoryId: CategoryIds[2],
    },
    {
      title: "Rum Sour",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/rum_sour.png",
      ingredients: [
        "얼음",
        "럼/30ml",
        "골드 럼/15ml",
        "라임 주스/30ml",
        "슈가 시럽/15ml",
        "계란 흰자",
      ],
      steps: [
        "쉐이커에 모든 재료와 얼음을 넣는다.",
        "부드러운 거품이 날 때까지 흔든다.",
        "차가운 소서 잔에 따라준다.",
      ],
      alc: 18,
      brief_description: "새콤 달콤한 맛을 내며 점심에 잘 어울리는 술이다.",
      keywords:
        "Bacardi Gold Bacardi Superior White Captain Morgan Original \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/라임lime/샴페인잔sauserglass",
      categoryId: CategoryIds[2],
    },
    {
      title: "Painkiller",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/painkiller.png",
      ingredients: [
        "얼음",
        "라이트 럼/30ml",
        "파인애플 주스/20ml",
        "코코넛 크림/20ml",
        "오렌지 주스/20ml",
        "넛맥",
      ],
      steps: [
        "잔에 얼음을 채운다.",
        "모든 재료를 쉐이커에 넣고 흔든다.",
        "얼음 위로 따라내고 넛맥(육두구)을 뿌려 장식한다.",
      ],
      alc: 18,
      brief_description:
        "여러 과일 주스가 들어가 무척 달콤하다. 점심에 가장 잘 어울리는 쉐이크",
      keywords:
        "Superior White Captain Morgan Original \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/넛맥nutmeg/",
      categoryId: CategoryIds[2],
    },
    {
      title: "Rum&Coke",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/Rum%26Coke.png",
      ingredients: ["얼음", "라이트 럼/30ml", "콜라/120ml"],
      steps: ["잔에 얼음을 채운다.", "기호에 맞게 콜라를 따라준다."],
      alc: 5,
      brief_description:
        "이름 그대로 럼과 콜라를 섞은 굉장히 간단한 칵테일, 라임주스를 추가하면 쿠바 리브레가 된다.",
      keywords:
        "Bacardi Superior White Captain Morgan Original\
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/콜라Coke/하이볼highball",
      categoryId: CategoryIds[2],
    },
    {
      title: "Hurricane",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/Hurricane.png",
      ingredients: [
        "얼음",
        "다크 럼/30ml",
        "라이트 럼/30ml",
        "석류 시럽/15ml",
        "오렌지 주스/15ml",
        "파인애플 주스/10ml",
        "레몬 주스/15ml",
        "웨지 오렌지",
      ],
      steps: [
        "재료들을 쉐이커에 넣고 잘 섞는다.",
        "얼음이 담긴 잔에 따른 후 그레나딘 시럽을 위에 붓는다.",
        "오렌지로 장식을 한다.",
      ],
      alc: 10,
      brief_description:
        "대서양에서 미국을 엄습하는 태풍을 의미하는 무서운 이름을 가진 칵테일 두가지 럼을 사용하는 것으로 유명.",
      keywords:
        "Bacardi Gold Bacardi Superior White Captain Morgan Original Malibu Coconut \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/오렌지주스orange파인애플주스pineapple레몬주스lemon/포코그란데글라스pocogrande",
      categoryId: CategoryIds[2],
    },
    {
      title: "Barbados Surprise",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/barbados_surprise.png",
      ingredients: [
        "얼음",
        "라이트 럼/60ml",
        "블루 큐라소/15ml",
        "오렌지 주스/60ml",
        "석류 시럽/15ml",
      ],
      steps: [
        "잔에 석류 시럽을 붓는다.",
        "얼음을 채우고 그 위에 오렌지 주스를 천천히 층이나게 붓는다.",
        "블루 큐라소와 럼을 섞어 그위에 천천히 붓는다.",
      ],
      alc: 12,
      brief_description:
        "카리브해에 위치한 바베이도스의 이름을 딴 레이어드 칵테일.",
      keywords:
        "Bacardi Gold Bacardi Superior White Captain Morgan Original \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/큐라소curacao/오렌지주스orange/포코그란데글라스pocogrande",
      categoryId: CategoryIds[2],
    },
    {
      title: "Mojito",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/mojito.png",
      ingredients: [
        "얼음",
        "라이트 럼/30ml",
        "소다수/60ml",
        "웨지 라임",
        "민트 잎",
      ],
      steps: [
        "라임과 설탕 민트를 쉐이커에 잘 섞는다.",
        "럼과 얼음을 넣고 잘 흔든다.",
        "차가운 하이볼 잔에 따르고 소다수로 채워준다.",
        "라임과 민트로 장식.",
      ],
      alc: 12,
      brief_description:
        "점심에 잘 어울린다 기호에 따라 설탕을 넣거나 라임주스 또는 탄산수 대신 사이다를 넣기도 한다.",
      keywords:
        "Bacardi Gold Bacardi Superior White Captain Morgan Original \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/soda소다수/라임lime민트mint/하이볼highball",
      categoryId: CategoryIds[2],
    },
    {
      title: "Mary Pickford",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/mary_pickford.png",
      ingredients: [
        "얼음",
        "라이트 럼/60ml",
        "파인애플 주스/20ml",
        "석류 시럽/10ml",
        "체리 주스/20ml",
      ],
      steps: [
        "재료와 얼을을 쉐이커에 넣고 잘 흔들어준다.",
        "차가운 소서형 샴페인 글라스에 따른다.",
      ],
      alc: 22,
      brief_description: "맛이 강한 칵테일, 에프터눈 티와 잘 어울린다.",
      keywords:
        "Bacardi Gold Bacardi Superior White Captain Morgan Original \
        바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/파인애플pineapple/cherry체리/석류grenadine/샴페인잔sauserglass",
      categoryId: CategoryIds[2],
    },
    //CategoryIds[2] #10
    {
      title: "Margarita",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/margarita.png",
      ingredients: ["얼음", "데킬라/45ml", "트리플 섹/15ml", "라임 주스/15ml"],
      steps: [
        "모든 재료들을 쉐이커에 넣고 흔들어준다.",
        "잔의 테두리에 소금을 Rimming해준다.",
        "얼음을 거르고 마가리타 잔에 따라준다.",
      ],
      alc: 19,
      brief_description:
        "데킬라 베이스 칵테일, 생선 및 해산물 요리와 가장 잘 어울린다.",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/트리플섹triplesec/마가리타잔margaritaglass",
      categoryId: CategoryIds[3],
    },
    {
      title: "Tequila Sunrise",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/tequila_sunrise.png",
      ingredients: [
        "얼음",
        "데킬라/45ml",
        "오렌지 주스/90ml",
        "석류 시럽/15ml",
        "웨지 오렌지",
      ],
      steps: [
        "얼음이 든 하이볼 글라스에 데킬라와 오랜지 주스를 따라준다.",
        "석류 시럽을 천천히 부어 시럽이 바닥에 가라앉게한다.",
        "이후 오렌지로 장식한다.",
      ],
      alc: 12,
      brief_description:
        "일출을 닮아 붙여진 이름 석류 시럽을 부을 때 해 뜰 때의 붉은 하늘을 연상시키는게 포인트",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/오렌지orange/하이볼highball",
      categoryId: CategoryIds[3],
    },
    {
      title: "Tequila Slammer",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/tequila_slammer.png",
      ingredients: ["데킬라/30ml", "소다수/30ml"],
      steps: [
        "더블 스트레이트 잔에 데킬라와 소다를 따른다.",
        "잔 주둥이를 냅킨으로 덮고 손바닥으로 단단히 감싸 쥐고 테이블을 내리친다.",
        "거품이 생겨나면 완성.",
      ],
      alc: 20,
      brief_description:
        "시원시원한 레시피 샷건이라고도 불린다. 짭짤한 음식과 잘 어울린다.",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/soda/straightshot",
      categoryId: CategoryIds[3],
    },
    {
      title: "El Diablo",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/el_diablo.png",
      ingredients: [
        "얼음",
        "데킬라/45ml",
        "크렘 드 카시스/15ml",
        "라임 주스/15ml",
        "진저에일/40ml",
      ],
      steps: [
        "진저에일을 제외한 재료들을 모두 쉐이킹한다.",
        "하이볼 잔에 따라준다.",
        "진저에일을 원하는 만큼 따라주고 블랙베리로 장식한다.",
      ],
      alc: 15,
      brief_description:
        "점심과 잘어울리며 카시스와 진저에일이 들어가 상큼하고도 생강 향으로 개운함을 느낄 수 있다.",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/진저에일ginger/하이볼highball",
      categoryId: CategoryIds[3],
    },
    {
      title: "Matador",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/matador.png",
      ingredients: [
        "얼음",
        "데킬라/30ml",
        "파인애플 주스/45ml",
        "레몬 주스/15ml",
        "파인애플",
      ],
      steps: [
        "쉐이커에 얼음과 모든 재료를 쉐이킹한다.",
        "얼음처럼 차가운 잔에 따라내고 파인애플과 체리로 장식한다.",
      ],
      alc: 16,
      brief_description:
        "애프터눈 티와 잘 어울리며, 파인애플과 체리 장식이 투우사를 상징합니다.",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/파인애플pineapple",
      categoryId: CategoryIds[3],
    },
    {
      title: "Vampiro",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/vampiro.png",
      ingredients: [
        "얼음",
        "데킬라/50ml",
        "토마토 주스/70ml",
        "오렌지 주스/30ml",
        "라임 주스/10ml",
        "꿀",
        "양파",
        "칠리",
        "우스터 소스",
      ],
      steps: [
        "모든 재료를 쉐이커에 넣고 흔든다.",
        "쉐이킹에 사용된 얼음을 거르고 소금을 약간 뿌리고 얼음을 채운 글라스에 붓는다.",
        "칠리와 라임으로 장식한다.",
      ],
      alc: 11,
      brief_description:
        "앙트레 또는 간단한 스낵으로 좋으며, 멕시코의 산 루이스 소야틀란(San Luis Soyatlán)의 청과점에서 만들어진 칵테일입니다.",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/꿀honey양파onion칠리chilli",
      categoryId: CategoryIds[3],
    },
    {
      title: "Mexicola",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/mexicola.png",
      ingredients: ["얼음", "데킬라/45ml", "콜라/135ml", "라임 주스/15ml"],
      steps: [
        "얼음이 담긴 하이볼 잔에 재료들을 빌드해준다.",
        "레몬 조각으로 장식한다.",
      ],
      alc: 15,
      brief_description: "럼콕 잭콕처럼 베이스에 콜라를 섞는 매우 간단한 음료.",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/하이볼highball",
      categoryId: CategoryIds[3],
    },
    {
      title: "Sunburn",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/sunburn.png",
      ingredients: [
        "얼음",
        "데킬라/30ml",
        "트리플 섹/30ml",
        "크렌베리 주스/90ml",
        "웨지 오렌지",
      ],
      steps: [
        "재료들을 하이볼 잔에 빌드해주면 완성.",
        "오렌지나 크렌베리로 장식.",
      ],
      alc: 14,
      brief_description:
        "트리플 섹과 크랜베리가 들어가 새콜달콤하고, 브런치와 먹기 좋습니다.",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/트리플섹triplesec/하이볼highball",
      categoryId: CategoryIds[3],
    },
    {
      title: "Blue Margarita",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/blue_margarita.png",
      ingredients: [
        "얼음",
        "데킬라/45ml",
        "블루 큐라소/15ml",
        "라임 주스/30ml",
      ],
      steps: [
        "모든 재료들을 쉐이커에 넣고 흔들어준다.",
        "잔의 테두리에 소금을 Rimming해준다.",
        "얼음을 거르고 마가리타 잔에 따라준다.",
      ],
      alc: 23,
      brief_description: "마가리타의 바리에이션 애프터눈 티와 잘 어울린다.",
      keywords:
        "1800 Anejo 1800 Blanco 1800 Reposado Jose Cuervo Especial Gold Patron Anejo Patron Reposado Patron Silver \
        아네호anejo블랑코blanco레포사도reposado호세쿠엘보josecuervo패트론아네호patronanejo패트론레포사도patronreposado패트론실버patronsilver/큐라소curacao/마가리타잔margaritaglass",
      categoryId: CategoryIds[3],
    },
    //CategoryIds[3] #10   
    {
      title: "Bolivian Kiss",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/bolivian_kiss.png",
      ingredients: ["아그와 디 볼리비아/60ml", "웨지 라임"],
      steps: [
        "잔 2개를 준비한다.",
        "라임을 각 잔에 넣는다.",
        "각 잔에 아그와를 부어 준다.",
      ],
      alc: 30,
      brief_description: "식욕을 자극하기 위한 식전음료로 추천한다.",
      keywords: "Agwa De Boliva아그와agwadebolivia",
      categoryId: CategoryIds[4],
    },
    {
      title: "Agwa Bomb",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/agwa_bomb.png",
      ingredients: ["아그와 디 볼리비아/30ml", "에너지 드링크"],
      steps: [
        "아그아 밤 전용 잔 하단에 에너지 드링크를 채운다.",
        "나머지 상단에 아그와를 채워넣는다.",
      ],
      alc: 30,
      brief_description: "활력을 주는 대표적인 아그와의 샷.",
      keywords: "Agwa De Boliva아그와agwadebolivia에너지드링크energy레드불redbullbomb",
      categoryId: CategoryIds[4],
    },
    {
      title: "Jager Bomb",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/jager_bomb.png",
      ingredients: ["예거마이스터/30ml", "에너지 드링크/260ml"],
      steps: [
        "예거잔이 있다면 예거잔에 재료를 섞어준다.",
        "예거잔이 없다면 한국의 폭탄주를 만드는 모양과 비슷하다.",
        "레드불이 있는 잔에 예거 샷을 드롭해준다.",
      ],
      alc: 4,
      brief_description:
        "독일의 술과 오스트리아 에너지음료의 만남 진정한 게르만의 칵테일.",
      keywords: "Jagermeister예거마이스터jagermeister에너지드링크energy레드불redbullbomb",
      categoryId: CategoryIds[4],
    },
    {
      title: "Jager&Coke",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/jager_coke.png",
      ingredients: ["얼음", "예거마이스터/30ml", "콜라/120ml"],
      steps: ["하이볼 잔에 모든 재료를 섞어준다."],
      alc: 20,
      brief_description: "콜라를 이용한 매우 간단한 음료.",
      keywords: "Jagermeister예거마이스터jagermeister콜라cokecola",
      categoryId: CategoryIds[4],
    },
    {
      title: "Jager Mary",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/jager_mary.png",
      ingredients: [
        "얼음",
        "예거마이스터/30ml",
        "토마토 주스/60ml",
        "우스터 소스/5ml",
        "타바스코 소스/5ml",
        "칠리",
      ],
      steps: [
        "텀블러에 얼음을 담아 토마토 주스를 붓는다.",
        "타바스코를 뿌려주고 예거 샷을 넣는다.",
        "토마토 주스를 더 넣어주고 우스터 소스를 위에 뿌린다.",
        "고추로 장식을 해준다.",
      ],
      alc: 10,
      brief_description:
        "브런치와 잘 어울립니다. 클래식한 블러디 메리에 쌉싸름한 맛이 가미된 과감한 음료",
      keywords:
        "Jagermeister예거마이스터jagermeister토마토우스터worcester타바스코tabasco칠리chili",
      categoryId: CategoryIds[4],
    },
    {
      title: "Blue Breeze",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/blue_breeze.png",
      ingredients: [
        "얼음",
        "힙노틱/30ml",
        "말리부 코코넛 럼/30ml",
        "파인애플 주스/30ml",
      ],
      steps: [
        "유리잔에 얼음을 채우고",
        "힙노틱을 따르고 코코넛 럼을 붓습니다.",
        "그 위에 파인애플 주스를 천천히 부어줍니다.",
      ],
      alc: 19,
      brief_description: "애프터눈 티와 잘 어울리는 매우 달콤한 칵테일",
      keywords: "Hpnotiq Malibu Coconut 힙노틱hpnotiq파인애플pineapple코코넛coconut",
      categoryId: CategoryIds[4],
    },
    {
      title: "Hpnotiq&Cognac",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/hpnotiq_and_cognac.png",
      ingredients: ["얼음", "힙노틱/30ml", "코냑/30ml"],
      steps: ["모든 재료를 넣고 잘 저어줍니다."],
      alc: 28,
      brief_description: "브런치와 잘어울리며 달콤하고 풍미가 있습니다.",
      keywords: "Hpnotiq힙노틱hpnotiq코냑cognac",
      categoryId: CategoryIds[4],
    },
    {
      title: "XO Milk Punch",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/xo_milk_punch.png",
      ingredients: [
        "얼음",
        "XO Cafe/15ml",
        "데킬라/30ml",
        "슈가 시럽/7ml",
        "우유/60ml",
        "커피 빈",
      ],
      steps: [
        "쉐이커에 담아 내용물을 잘 섞습니다.",
        "잔에 따라낸 후 커피 콩으로 장식합니다.",
      ],
      alc: 30,
      brief_description:
        "클래식하고 달콤한 브런치 칵테일로 하루의 시작에 어울립니다.",
      keywords: "Patron XO Cafexocafetequila데킬라커피coffee우유milk",
      categoryId: CategoryIds[4],
    },
    {
      title: "Winter In Russia",
      image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/winterinrussia.png",
      ingredients: ["얼음", "XO Cafe/30ml", "데킬라/45ml", "크림"],
      steps: [
        "얼음을 채운 잔에 패트론 실버와 XoCafe를 따릅니다.",
        "그 위에 해비 크림을 부드럽게 레이어링 합니다..",
      ],
      alc: 35,
      brief_description: "저녁 식 후에 잘어울리는 테킬라 버전의 화이트 러시안.",
      keywords: "Patron XO Cafexocafetequila데킬라패트론patronsilver",
      categoryId: CategoryIds[4],
    },
  ];

  try {
    Recipes.collection.drop();

    for (let i = 0; i < drinkRecipes.length; i++) {
      await Recipes.create(drinkRecipes[i]);
    }
  } catch (err) {
    res.json({ message: "fail", err });

    return;
  }

  res.json({ message: "success" });
});

export { initDrinkRecipeRouter };
