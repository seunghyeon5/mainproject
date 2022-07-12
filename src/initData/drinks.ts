import express from "express";
import { Types } from "mongoose";

import Drinks from "../models/drink";
import drinkCategories from "../models/category";
import { IDrink } from "../interfaces/drink";
import { ICategory } from "../interfaces/category";

const initDrinksRouter = express.Router();
// 이후에 위스키 추가 예정 category model interface에 반영해주기
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
      flavour: "Vanilia",
      alc: 38,
      country: "스웨덴",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/absolut-vanilia.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "앱솔루트 바닐라",
      title_eng: "Absolut Vanilia",
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
      flavour: "Peach",
      alc: 35,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/ciroc_peach.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "시락 워터멜론",
      title_eng: "Ciroc Watermelon",
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
      flavour: "Watermelon",
      alc: 35,
      country: "프랑스",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/ciroc_watermelon.png",
      categoryId: CategoryIds[0],
    },
    {
      title_kor: "그레이구스",
      title_eng: "Grey Goose",
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
      flavour: "Cucumber",
      alc: 44,
      country: "스코틀랜드",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/hendrick's.png",
      categoryId: CategoryIds[1],
    },
    {
      title_kor: "바카디 골드",
      title_eng: "Bacardi Gold",
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
      flavour: "pure",
      alc: 30,
      country: "네덜란드",
      image:
        "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/images/agwa_de_bolivia.png",
      categoryId: CategoryIds[4],
    },
    {
      title_kor: "예거마이스터",
      title_eng: "jagermeister",
      short_description: "추후 간단한 설명이 들어올 예정입니다.",
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
