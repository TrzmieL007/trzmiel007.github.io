import { useTranslation } from 'react-i18next';
import { Selector } from 'components/Selector';

export default () => {
    const { t } = useTranslation();

    return <div>
        <h2>{t('demoPage.title')}</h2>
        <Selector
            label={t('demo.SelectorLabel')}
            options={[
                { id: 1, label: 'Opt 1', value: 3 },
                { id: 2, label: 'Option 2', value: 1 },
                { id: 3, label: 'Option 3 longer', value: '2' },
            ]}
            defaultId={2}
        />
        <Selector
            label={t('demo.SelectorLabelSmall')}
            options={[
                { id: 1, label: 'Smal option One', value: 'sm' },
                { id: 2, label: 'Example Two', value: 'sm2' },
                { id: 3, label: 'X', value: '3' },
            ]}
            defaultId={2}
            size="small"
        />
    </div>;
}