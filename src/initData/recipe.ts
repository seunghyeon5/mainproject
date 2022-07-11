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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/비터즈bitters/레몬lemon/온더락rock",
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
        "진저비어/40ml",
        "웨지 라임",
      ],
      steps: [
        "Mule mug에 얼음를 채운다.",
        "보드카 및 라임 주스를 넣는다.",
        "진저비어를 가득 채운다.",
        "라임으로 장식한다.",
      ],
      alc: 18,
      brief_description: "로스팅 또는 바베큐 음식과 잘 어울립니다.",
      keywords:
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/진저비어gingerbeer/라임lime/Mulemug",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/소다수soda/라임lime/하이볼highball",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/라임lime/소다수soda오렌지크렌베리/하이볼highball",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/깔루아kahlua/커피coffee에스프레소espresso/칵테일잔cocktail",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN/바카디bacardi캡틴모건captain말리부malibu럼rum/블랑코blanco데킬라/트리플섹triplesec/라임lime/콜라coke/하이볼highball",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/라임lime민트잎mint/소다수coda슈가sugar/하이볼highball",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/큐라소curacao/코코넛coconut/파인애플pineapple/하이볼highball",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/트리플섹triplesec/라임lime레몬lemon/샷shot스트레이트straight",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/토닉tonic/라임lime/하이볼highball",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/샴페인champagne",
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
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/오렌지orange/하이볼highball",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/소다수soda/하이볼highball",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/라임lime/온더락rock",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/레몬lemon/온더락rock/하이볼highball",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/오렌지orange/칵테일잔cocktailglass",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/석류grenadine/샴페인잔sauserglass",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/트리플섹triplesec/칵테일잔cocktail",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/애프리콧브랜디brandyapricot/샴페인잔sauserglass",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/베르무트vermouth/올리브/마티니잔martiniglass",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/라임lime/하이볼highball",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/스위트베르무트vermouth/샴페인잔sauserglass",
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
        "비피터beefeater봄베이사파이어bombaysapphire탱커레이tanqueray진GIN헨드릭스hendrick's/스위트베르무트vermouth/마티니잔martiniglass",
      categoryId: CategoryIds[1],
    },

    //CategoryIds[1] #11
    /*
    {
      title: "",
      image:
        "",
      ingredients: [""],
      steps: [
        "",
      ],
      alc: ,
      brief_description: "",
      keywords:
        "",
      categoryId: CategoryIds[2],
    },
    */
    {
      title: "Pina Colada",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/pina_colada.png",
      ingredients: ["얼음","라이트 럼/30ml","다크 럼/15ml","말리부 코코넛 럼/15ml","파인애플 주스/50ml","파인애플"],
      steps: [
        "블렌더에 얼음과 모든 재료를 넣는다.",
        "블렌더로 곱게 갈아준다.",
        "차가운 포코그란데 글라스에 담고 파인애플 조각으로 장식한다.",
      ],
      alc: 19,
      brief_description: "파인애플 주스와 블렌딩되어 점심과 가장 잘 어울립니다.",
      keywords:
        "바카디bacardi럼rum캠틴모건captainmorgan말리부malibu/다크럼dark/파인애플pineapple/포코그란데글라스pocogrande",
      categoryId: CategoryIds[2],
    },
    {
      title: "Daiquiri",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/classic_daiquiri.png",
      ingredients: ["얼음","라이트 럼/60ml","라임 주스/30ml","슈가 시럽/15ml","웨지 라임"],
      steps: [
        "쉐이커에 얼음과 모든 재료를 넣는다.",
        "잘 흔들어준다.",
        "차가운 소서형 샴페인 잔에 따른다."
      ],
      alc: 23,
      brief_description: "칠레의 광산의 이름을 딴 다이커리, 애프터눈 티와 잘 어울린다.",
      keywords:
        "바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white/라임lime/샴페인잔sauserglass",
      categoryId: CategoryIds[2],
    },
    {
      title: "Cuba Libre",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/cuba_libre.png",
      ingredients: ["얼음","라이트 럼/30ml","콜라/60ml","라임 주스/10ml","웨지 라임"],
      steps: [
        "하이볼 잔에 얼을을 채운다.",
        "라이트 럼과 라임 주스를 따라준다.",
        "콜라를 위에 따라주고 라임으로 장식한다."
      ],
      alc: 12,
      brief_description: "큰 덩어리 고기와 어울린다. 스페인 식민지였던 쿠바의 독립운동 당시에 생겨난 Viva Cuba Libre라는 표어에서 유래된 이름이다.",
      keywords:
        "바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white/라임lime/콜라coke/하이볼highball",
      categoryId: CategoryIds[2],
    },
    {
      title: "Rum Sour",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/rum_sour.png",
      ingredients: ["얼음","럼/30ml","골드 럼/15ml","라임 주스/30ml","슈가 시럽/15ml","계란 흰자"],
      steps: [
        "쉐이커에 모든 재료와 얼음을 넣는다.",
        "부드러운 거품이 날 때까지 흔든다.",
        "차가운 소서 잔에 따라준다.",
      ],
      alc: 18,
      brief_description: "새콤 달콤한 맛을 내며 점심에 잘 어울리는 술이다.",
      keywords:
        "바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/라임lime/샴페인잔sauserglass",
      categoryId: CategoryIds[2],
    },
    {
      title: "Painkiller",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/painkiller.png",
      ingredients: ["얼음","라이트 럼/30ml","파인애플 주스/20ml","코코넛 크림/20ml","오렌지 주스/20ml","넛맥"],
      steps: [
        "잔에 얼음을 채운다.",
        "모든 재료를 쉐이커에 넣고 흔든다.",
        "얼음 위로 따라내고 넛맥(육두구)을 뿌려 장식한다."
      ],
      alc: 18,
      brief_description: "여러 과일 주스가 들어가 무척 달콤하다. 점심에 가장 잘 어울리는 쉐이크",
      keywords:
        "바카디bacardi럼rum캠틴모건captainmorgan말리부malibu라이트럼화이트럼white골드럼gold/넛맥nutmeg/",
      categoryId: CategoryIds[2],
    },

    //CategoryIds[2] #5
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
