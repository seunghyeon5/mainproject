import express from "express";
  import { IIngredient } from "../interfaces/ingredient";
  import Ingredients from "../models/ingredient";
  
  const initIngredientsRouter = express.Router();
  
  initIngredientsRouter.post("/", async (req, res) => {
    const Ingredient: Array<IIngredient> = [
      {
        title: "골드 럼",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/rum_gold_amber.png",
        category:
          "alc",
      },
      {
        title: "깔루아",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/coffee_liqueur_kahlua.png",
        category:
          "alc",
      },      
      {
        title: "다크 럼",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/rum_dark.png",
        category:
          "alc",
      },
      {
        title: "데킬라",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/tequila.png",
        category:
          "alc",
      },
      {
        title: "데킬라 블랑코",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/tequila_blanco.png",
        category:
          "alc",
      },
      {
        title: "드라이 베르무트",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/vermouth_dry.png",
        category:
          "alc",
      },
      {
        title: "라이트 럼",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/rum_light_white.png",
        category:
          "alc",
      },
      {
        title: "럼",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/rum.png",
        category:
          "alc",
      },
      {
        title: "말리부 코코넛 럼",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/rum_coconut_malibu.png",
        category:
          "alc",
      },
      {
        title: "버번",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/bourbon.png",
        category:
          "alc",
      },
      {
        title: "보드카",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/vodka.png",
        category:
          "alc",
      },
      {
        title: "복숭아 슈냅스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/peach_schnapps.png",
        category:
          "alc",
      },
      {
        title: "블루 큐라소",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/curacao_blue.png",
        category:
          "alc",
      },
      {
        title: "비터즈 소량",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/bitters.png",
        category:
          "alc",
      },
      {
        title: "샴페인",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/champagne.png",
        category:
          "alc",
      },
      {
        title: "스위트 베르무트",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/vermouth_sweet.png",
        category:
          "alc",
      },
      {
        title: "아그와 디 볼리비아",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/agwa_de_bolivia.png",
        category:
          "alc",
      },
      {
        title: "애프리콧 브랜디",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/brandy_apricot.png",
        category:
          "alc",
      },
      {
        title: "예거마이스터",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/jagermeister.png",
        category:
          "alc",
      },
      {
        title: "진",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/gin.png",
        category:
          "alc",
      },   
      {
        title: "코냑",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/cognac.png",
        category:
          "alc",
      }, 
      {
        title: "크렘 드 카시스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/creme_de_cassis.png",
        category:
          "alc",
      },  
      {
        title: "트리플 섹",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/de_kuyper_triple_sec.png",
        category:
          "alc",
      },
      {
        title: "힙노틱",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/hpnotiq_liqueur.png",
        category:
          "alc",
      },
      {
        title: "XO Cafe",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/alc/xo-cafe.png",
        category:
          "alc",
      },
      
      //end of alc #25
      {
        title: "구아바 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/guava_juice.png",
        category:
          "side",
      },
      {
        title: "라임 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/lime-juice.png",
        category:
          "side",
      },
      {
        title: "레몬 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/lemon_juice.png",
        category:
          "side",
      },
      {
        title: "사과 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/apple_juice.png",
        category:
          "side",
      },
      {
        title: "소다수",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/soda_water.png",
        category:
          "side",
      },
      {
        title: "에너지 드링크",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/red_bull.png",
        category:
          "side",
      },     
      {
        title: "오렌지 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/orange_juice.png",
        category:
          "side",
      },  
      {
        title: "우유",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/milk.png",
        category:
          "side",
      },        
      {
        title: "자몽 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/grapefruit_juice.png",
        category:
          "side",
      },
      {
        title: "진저에일",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/ginger_beer.png",
        category:
          "side",
      },
      {
        title: "체리 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/maraschino_juice.png",
        category:
          "side",
      },
      {
        title: "콜라",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/coke.png",
        category:
          "side",
      },
      {
        title: "크렌베리 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/cranberry_juice.png",
        category:
          "side",
      },
      {
        title: "토닉워터",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/tonic_water.png",
        category:
          "side",
      },
      {
        title: "토마토 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/tomato_juice.png",
        category:
          "side",
      },
      {
        title: "파인애플 주스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/side/pineapple_juice.png",
        category:
          "side",
      },      
      //end of side #16
      {
        title: "넛맥",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/nutmeg.png",
        category:
          "garnish",
      },
      {
        title: "민트 잎",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/mint.png",
        category:
          "garnish",
      },
      {
        title: "올리브",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/olive.png",
        category:
          "garnish",
      },
      {
        title: "웨지 라임",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/lime.png",
        category:
          "garnish",
      },
      {
        title: "웨지 레몬",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/lemon.png",
        category:
          "garnish",
      },
      {
        title: "웨지 오렌지",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/orange.png",
        category:
          "garnish",
      },
      {
        title: "칵테일 체리",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/cocktail_cherry.png",
        category:
          "garnish",
      },
      {
        title: "커피 빈",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/coffee_bean.png",
        category:
          "garnish",
      },
      {
        title: "파인애플",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/garnish/pineapple.png",
        category:
          "garnish",
      },
      //end of garnish #9
      {
        title: "계란 흰자",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/egg_white.png",
        category:
          "etc",
      },
      {
        title: "꿀",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/honey.png",
        category:
          "etc",
      },
      {
        title: "라임 시럽",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/lime_syrup.png",
        category:
          "etc",
      },
      {
        title: "석류 시럽",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/grenadine_syrup.png",
        category:
          "etc",
      },
      {
        title: "슈가 시럽",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/sugar_syrup.png",
        category:
          "etc",
      },
      {
        title: "양파",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/onion_red.png",
        category:
          "etc",
      },
      {
        title: "얼음",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/Ice.png",
        category:
          "etc",
      },
      {
        title: "에스프레소",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/espresso.png",
        category:
          "etc",
      },
      {
        title: "우스터 소스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/worcestershire_sauce.png",
        category:
          "etc",
      },
      {
        title: "칠리",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/chili.png",
        category:
          "etc",
      },
      {
        title: "코코넛 시럽",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/coconut_syrup.png",
        category:
          "etc",
      },
      {
        title: "코코넛 크림",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/coconut_cream.png",
        category:
          "etc",
      },
      {
        title: "크림",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/cream.png",
        category:
          "etc",
      },
      {
        title: "타바스코 소스",
        image:
          "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/ingredient/etc/tabasco_sauce.png",
        category:
          "etc",
      },
      //end of etc #14
     
    ];
    try {
        Ingredients.collection.drop();
  
      for (let i = 0; i < Ingredient.length; i++) {
        await Ingredients.create(Ingredient[i]);
      }
    } catch (err) {
      res.json({ message: "fail", err });
  
      return;
    }
  
    res.json({ message: "success" });
  });
  
  export { initIngredientsRouter };
  