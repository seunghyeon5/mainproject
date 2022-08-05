import express, { Request, Response, NextFunction, Router, response } from "express";
import { ICategory } from "../interfaces/category";
import Categories from "../models/category";

const initCategoryRouter = express.Router();

initCategoryRouter.post("/", async (req, res) => {
    const Category: Array<ICategory> = [
        {
            title: "VODKA",
            image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/category/vodka-icon.png",
            description:
                "40도 이상의 알코올 도수를 가진 대표적인 증류주 전쟁에서 보드카는 절대 없어서는 안되는 물건이다! 아무리 가혹한 동장군이 찾아와도, 보드카 한병을 전우들과 돌려 마시면, 곧바로 온몸이 화끈하게 데워져서 마치 다 같이 사우나에 들어온 느낌이다."
        },
        {
            title: "GIN",
            image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/category/gin-icon.png",
            description: "대표적인 증류주 한 종류 알코올 도수는 대개 40도 이상이며 독특한 향취(강한 솔향)가 있다. 주로 칵테일을 제조하는 데 많이 쓰인다."
        },
        {
            title: "RUM",
            image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/category/rum-icon.png",
            description:
                "태생이 태생이다보니 아직도 싸구려 이미지가 짙지만, 정작 국내에서 접할 수 있는 것들은 칵테일 베이스용 저가 화이트 럼이 아니면 고급 다크 럼들. 싸구려 이미지는 주요 소비층이 뱃사람, 특히 상선사관이나 해군 장교 같은 이들이 아니라 하급 선원이나 수병, 어부, 해적 같은 하류계층이기 때문에 생겼다."
        },
        {
            title: "TEQUILA",
            image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/category/tequila-icon.png",
            description: "멕시코산 술. 대표적 증류주 중 하나로 알콜 농도는 40~52%. 할리스코 주에 위치한 Tequila라는 지역의 이름을 딴 것."
        },
        {
            title: "LIQUEUR",
            image: "https://drinks-info-for-ct.s3.ap-northeast-2.amazonaws.com/category/liqueur-icon.png",
            description:
                "국내에는 혼성주라는 명칭으로 많이 불린다. 증류주나 주정에 당분을 넣고 과실이나 꽃, 식물의 잎이나 뿌리 등을 넣어 맛과 향기를 더한 술을 뜻한다. 즉, '이미 완성된 술'에 향을 내기 위하여 향신료 및 감미료를 더한 술이다."
        }
    ];
    try {
        Categories.collection.drop();

        for (let i = 0; i < Category.length; i++) {
            await Categories.create(Category[i]);
        }
    } catch (err) {
        res.json({ message: "fail", err });

        return;
    }

    res.json({ message: "success" });
});

export { initCategoryRouter };
