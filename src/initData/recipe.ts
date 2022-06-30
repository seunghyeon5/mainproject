import express, {
  Request,
  Response,
  NextFunction,
  Router,
  response,
} from "express";
import mongoose, { ObjectId } from "mongoose";
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
        "보드카 45ml",
        "레몬 주스 30ml",
        "슈가 시럽 15ml",
        "비터즈 소량",
        "계란 흰자 15ml",
        "칵테일 체리",
        "웨지 레몬",
      ],
      brief_description:
        "보스턴 쉐이커에 얼음를 채운다. 모든 재료를 넣는다. 쉐이킹을 한 후 스트레이너를 사용하여 차가운 락 글래스에 따른다. 체리 및 레몬으로 장식한다.",
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
        "보드카 45ml",
        "라임 주스 30ml",
        "진저비어",
        "웨지 라임",
      ],
      brief_description:
        "Mule mug에 얼음를 채운다. 앱솔루트 보드카 및 라임 주스를 넣는다. 진저비어를 가득 채운다. 라임으로 장식한다.",
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
        "보드카 40ml",
        "소다수 150ml",
        "라임 주스 15ml",
        "웨지 라임",
      ],
      brief_description:
        "하이볼 글래스에 얼음를 채운다. 모든 재료를 넣는다. 라임으로 장식한다.",
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
        "보드카 20ml",
        "라이트 오렌지 주스 100ml",
        "크랜베리 주스 100ml",
        "복숭아 슈냅스 20ml",
        "슬라이스 라임",
        "칵테일 체리",
      ],
      brief_description:
        "하이볼 글래스에 얼음를 채운다. 모든 재료를 넣는다. 라임 및 체리로 장식한다.",
      keywords:
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/라임lime/소다수soda오렌지크랜베리/하이볼highball",
      categoryId: CategoryIds[0],
    },
    {
      title: "Espresso Martini",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/espresso_martini.png",
      ingredients: [
        "얼음",
        "보드카 40ml",
        "깔루아 20ml",
        "에스프레소 20ml",
        "커피 콩",
      ],
      brief_description:
        "보스턴 쉐이커에 얼음를 채운다. 모든 재료를 넣는다. 쉐이킹을 한 후 스트레이너를 사용하여 차가운 칵테일 글래스에 따른다. 커피 콩으로 장식한다.",
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
        "보드카 20ml",
        "라이트 럼 20ml",
        "진 20ml",
        "데킬라 블랑코 20ml",
        "트리플 섹 20ml",
        "레몬 주스 40ml",
        "콜라 20ml",
        "슬라이스 라임",
      ],
      brief_description:
        "하이볼 글래스에 얼음를 채운다. 모든 재료를 넣는다. 라임으로 장식한다.",
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
        "보드카 45ml",
        "슈가시럽 20ml",
        "민트잎",
        "쿼터 라임",
        "소다수",
      ],
      brief_description:
        "하이볼 글래스에 보드카, 슈가시럽, 민트잎 및 라임를 넣고 으깬다. 소다수를 가득 채운다. 민트잎으로 장식한다.",
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
        "보드카 25ml",
        "블루 큐라소 25ml",
        "코코넛 시럽 10ml",
        "파인애플 주스",
        "체리",
      ],
      brief_description:
        "하이볼 글래스에 얼음를 채운다. 보드카, 블루 큐라소 및 코코넛 시럽를 넣는다. 파인애플 주스를 가득 채운다. 체리로 장식한다.",
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
        "보드카 30ml",
        "트리플 섹 15ml",
        "레몬 주스 15ml",
        "웨지 라임",
      ],
      brief_description:
        "보스턴 쉐이커에 얼음를 채운다. 모든 재료를 넣는다. 쉐이킹을 한 후 스트레이너를 사용하여 차가운 샷 글래스에 따른다.",
      keywords:
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/트리플섹triplesec/라임lime레몬lemon/샷shot스트레이트straight",
      categoryId: CategoryIds[0],
    },
    {
      title: "White Russian",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/white_russian.png",
      ingredients: [
        "보드카 40ml", 
        "깔루아 40ml", 
        "크림 40ml"
      ],
      brief_description: "락 글래스에 얼음를 채운다. 모든 재료를 넣는다.",
      keywords:
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/깔루아kahlua/크림cream/온더락rock",
      categoryId: CategoryIds[0],
    },
    {
      title: "Vodka Tonic",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/vodka_tonic.png",
      ingredients: [
        "얼음", 
        "보드카 45ml", 
        "토닉워터 150ml", 
        "웨지 라임"
      ],
      brief_description:
        "하이볼 글래스에 얼음를 채운다. 모든 재료를 넣는다. 라임으로 장식한다.",
      keywords:
        "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/토닉tonic/라임lime/하이볼highball",
      categoryId: CategoryIds[0],
    },
    {
        title: "Vodka Mimosa",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/vodka_mimosa.png",
        ingredients: [
          "얼음", 
          "보드카 25ml", 
          "오렌지 주스 50ml", 
          "샴페인"
        ],
        brief_description:
          "샴페인 글래스에 얼음를 채운다. 보드카 및 오렌지 주스를 넣는다. 샴페인를 가득 채운다.",
        keywords:
          "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/샴페인champagne",
        categoryId: CategoryIds[0],
      },
      {
        title: "Screwdriver",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/recipe/screwdriver.png",
        ingredients: [
          "얼음", 
          "보드카 45ml", 
          "오렌지 주스 50ml", 
          "웨지 오렌지"
        ],
        brief_description:
          "하이볼 글래스에 얼음를 채운다. 모든 재료를 넣는다. 오렌지로 장식한다.",
        keywords:
          "앱솔루트absolut그레이구스greygoose벨베디어Belvedere시락ciroc보드카vodka/오렌지orange/하이볼highball",
        categoryId: CategoryIds[0],
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
