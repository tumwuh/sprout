import {useI18n} from "vue-i18n";

export default function formatToRupiah(price: number) {
    const {t} = useI18n()
    return  price? new Intl.NumberFormat('ID', {style: 'currency', currency: 'IDR'}).format(
        price,
    ) : t('free')
}