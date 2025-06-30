import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { RootState } from '@/store/redux/store';
import { UserState } from '@/store/redux/user';
import { useSelector } from 'react-redux';

export function Collapsible({ children, title, isOpenVal=false }: PropsWithChildren & { title: string, isOpenVal:boolean }) {
  const [isOpen, setIsOpen] = useState(isOpenVal);
  const {   currentTheme } = useSelector<RootState, UserState >((state) => state.user);

  
  return (
    <ThemedView style={{marginBottom:10, marginTop:10, width:'100%'}}>
      <TouchableOpacity
        style={[
          styles.heading, 
          {
            backgroundColor: isOpen ? currentTheme?.colors?.backdrop : currentTheme?.colors?.onBackground,
            borderStyle :'solid', 
            borderColor:`${currentTheme?.colors?.placeholder}`,
            borderBottomColor: isOpen ? 'transparent':`${currentTheme?.colors?.placeholder}`,
            borderBottomLeftRadius:  isOpen ? 0 :10,
            borderBottomRightRadius: isOpen ? 0 :10,
          },
        ]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.3}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={currentTheme?.colors?.text}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText style={{color: currentTheme?.colors?.text}}  type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={{...styles.content,}}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, 
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    width:'100%',
    flex: 1,
   },
  content: {
    
   },
});
