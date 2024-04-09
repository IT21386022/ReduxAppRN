import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { Text, View } from 'react-native';

const TimeAgo = ({ timestamp }) => {
    let timeAgo = '';
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }

    return (
        <View>
            <Text title={timestamp}>&nbsp; <Text style={{ fontStyle: 'italic' }}>{timeAgo}</Text></Text>
        </View>
    );
}

export default TimeAgo;
