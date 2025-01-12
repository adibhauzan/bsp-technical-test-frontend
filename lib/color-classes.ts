const getColorClasses = (color: string) => {
    const colorClasses: Record<string, Record<string, string>> = {
        green: {
            widgetBgColor: 'bg-green-100/90',
            bgColor: 'bg-green-500',
            textColor: 'text-green-500',
            mediumWidgetBgColor: 'bg-green-500/50',
            mediumWidgetTextColor: 'text-green-700',
        },
        blue: {
            widgetBgColor: 'bg-blue-100/90',
            bgColor: 'bg-blue-500',
            textColor: 'text-blue-500',
            mediumWidgetBgColor: 'bg-blue-500/50',
            mediumWidgetTextColor: 'text-blue-700',
        },
        red: {
            widgetBgColor: 'bg-red-100/90',
            bgColor: 'bg-red-500',
            textColor: 'text-red-500',
            mediumWidgetBgColor: 'bg-red-500/50',
            mediumWidgetTextColor: 'text-red-700',
        },
        orange: {
            widgetBgColor: 'bg-orange-100/90',
            bgColor: 'bg-orange-500',
            textColor: 'text-orange-500',
            mediumWidgetBgColor: 'bg-orange-500/50',
            mediumWidgetTextColor: 'text-orange-700',
        },
    };

    return (
        colorClasses[color] || {
            widgetBgColor: '',
            bgColor: '',
            textColor: '',
            mediumWidgetBgColor: '',
            mediumWidgetTextColor: '',
        }
    );
};

export default getColorClasses;
