import React, { useState } from "react";
import { useLang } from "./LanguageContext";

const DISCLAIMER = {
  es: {
    title: "AVISO LEGAL Y DESCARGO DE RESPONSABILIDAD",
    sections: [
      {
        heading: "1. Naturaleza de la aplicación",
        text: "SentinelGuardian es una herramienta educativa y de orientación diseñada para aumentar las probabilidades de supervivencia ante catástrofes naturales o generadas por el ser humano. Esta aplicación NO garantiza el bienestar, la seguridad ni la supervivencia de sus usuarios bajo ninguna circunstancia."
      },
      {
        heading: "2. Perfil SOS y contactos de emergencia",
        text: "El funcionamiento del botón SOS depende EXCLUSIVAMENTE de que el usuario haya registrado al menos dos contactos de emergencia en su Perfil SOS. Si el Perfil SOS está incompleto, la app NO podrá enviar alertas ni coordenadas de ubicación a ningún equipo de rescate ni contacto personal. Los desarrolladores no asumen ninguna responsabilidad derivada de la omisión de completar el Perfil SOS."
      },
      {
        heading: "3. Dependencia del dispositivo y la red",
        text: "El correcto funcionamiento de esta aplicación requiere: (a) un smartphone con GPS funcional; (b) batería suficiente; (c) cobertura celular para el envío de SMS de emergencia; (d) conexión a internet para funciones en línea como mapas y noticias. Los desarrolladores no se responsabilizan por fallos del dispositivo, agotamiento de batería, falta de señal o cualquier limitación técnica del hardware."
      },
      {
        heading: "4. Información médica y de primeros auxilios",
        text: "El contenido médico, de primeros auxilios y de supervivencia incluido en esta aplicación es de carácter orientativo y educativo. NO reemplaza la atención médica profesional, la capacitación certificada en primeros auxilios ni el consejo de expertos en seguridad. Los procedimientos descritos pueden variar según el contexto, la región y la situación específica. Su aplicación es responsabilidad exclusiva del usuario."
      },
      {
        heading: "5. Exactitud y actualización de la información",
        text: "Los protocolos, técnicas y recomendaciones incluidas en la app se basan en fuentes reconocidas, pero pueden no ser aplicables en todos los contextos. Los desarrolladores no garantizan que la información esté actualizada ni que sea apropiada para todas las situaciones de emergencia."
      },
      {
        heading: "6. Servicio de noticias y alertas",
        text: "Las noticias y alertas mostradas en el ticker provienen de fuentes externas sobre las cuales los desarrolladores no tienen control. Los desarrolladores no se responsabilizan por la exactitud, actualidad o completitud de dicha información."
      },
      {
        heading: "7. Limitaciones del GPS y envío de coordenadas",
        text: "La precisión del GPS depende del dispositivo, las condiciones atmosféricas y la cobertura satelital. El envío de coordenadas por SMS requiere señal celular activa. En zonas de desastre, la infraestructura de telecomunicaciones puede estar dañada o congestionada, impidiendo el envío de alertas. Los desarrolladores no garantizan la entrega de mensajes de emergencia."
      },
      {
        heading: "8. Exención de responsabilidad",
        text: "Los desarrolladores de SentinelGuardian no asumen ninguna responsabilidad por daños directos, indirectos, incidentales, especiales o consecuentes, incluyendo pero no limitándose a lesiones físicas, pérdida de extremidades, discapacidad o muerte, derivados del uso, mal uso, o imposibilidad de uso de esta aplicación."
      },
      {
        heading: "9. Aceptación",
        text: "Al marcar la casilla de aceptación y continuar, el usuario declara haber leído, comprendido y aceptado íntegramente los términos de este descargo de responsabilidad. El uso continuado de la aplicación implica la aceptación plena de estas condiciones."
      },
    ],
    checkLabel: "He leído y acepto íntegramente los términos anteriores",
    btnLabel: "ACEPTO Y CONTINUAR",
    scrollWarning: "↓ Por favor, lee hasta el final antes de aceptar",
  },
  en: {
    title: "LEGAL NOTICE AND DISCLAIMER",
    sections: [
      { heading: "1. Nature of the Application", text: "SentinelGuardian is an educational and guidance tool designed to increase the chances of survival in natural or man-made disasters. This application does NOT guarantee the well-being, safety, or survival of its users under any circumstances." },
      { heading: "2. SOS Profile and Emergency Contacts", text: "The SOS button functions EXCLUSIVELY when the user has registered at least two emergency contacts in their SOS Profile. If the SOS Profile is incomplete, the app will NOT be able to send alerts or GPS coordinates to rescue teams or personal contacts. Developers assume no responsibility arising from failure to complete the SOS Profile." },
      { heading: "3. Device and Network Dependency", text: "Proper functioning requires: (a) a smartphone with functional GPS; (b) sufficient battery; (c) cellular coverage for SMS; (d) internet connection for online features. Developers are not responsible for device failures, battery drain, lack of signal, or hardware limitations." },
      { heading: "4. Medical and First Aid Information", text: "Medical and survival content is educational only. It does NOT replace professional medical care, certified first aid training, or expert safety advice. Procedures may vary by context and region. Application is the user's sole responsibility." },
      { heading: "5. Accuracy of Information", text: "Protocols and recommendations are based on recognized sources but may not apply in all contexts. Developers do not guarantee information is current or appropriate for all emergency situations." },
      { heading: "6. News and Alert Service", text: "News shown in the ticker comes from external sources beyond developers' control. Developers are not responsible for accuracy, timeliness, or completeness of such information." },
      { heading: "7. GPS and Coordinate Transmission Limitations", text: "GPS accuracy depends on device, atmospheric conditions, and satellite coverage. SMS requires active cellular signal. In disaster zones, telecommunications infrastructure may be damaged or congested. Developers do not guarantee delivery of emergency messages." },
      { heading: "8. Liability Waiver", text: "SentinelGuardian developers assume no liability for direct, indirect, incidental, special, or consequential damages, including but not limited to physical injury, loss of limb, disability, or death, arising from use, misuse, or inability to use this application." },
      { heading: "9. Acceptance", text: "By checking the acceptance box and continuing, the user declares having read, understood, and fully accepted these terms. Continued use implies full acceptance of these conditions." },
    ],
    checkLabel: "I have read and fully accept the above terms",
    btnLabel: "I ACCEPT AND CONTINUE",
    scrollWarning: "↓ Please read to the end before accepting",
  },
  fr: {
    title: "AVIS LÉGAL ET CLAUSE DE NON-RESPONSABILITÉ",
    sections: [
      { heading: "1. Nature de l'application", text: "SentinelGuardian est un outil éducatif conçu pour augmenter les chances de survie lors de catastrophes. Cette application NE garantit PAS le bien-être ni la survie de ses utilisateurs en toutes circonstances." },
      { heading: "2. Profil SOS et contacts d'urgence", text: "Le bouton SOS fonctionne UNIQUEMENT si l'utilisateur a enregistré au moins deux contacts d'urgence dans son Profil SOS. Si le profil est incomplet, l'app ne pourra PAS envoyer d'alertes. Les développeurs n'assument aucune responsabilité en cas d'omission." },
      { heading: "3. Dépendance de l'appareil et du réseau", text: "Nécessite: (a) smartphone avec GPS fonctionnel; (b) batterie suffisante; (c) couverture cellulaire pour SMS; (d) connexion internet pour fonctions en ligne. Les développeurs ne sont pas responsables des défaillances techniques." },
      { heading: "4. Informations médicales et premiers secours", text: "Le contenu médical est éducatif uniquement. Il ne remplace pas les soins médicaux professionnels ni la formation certifiée en premiers secours. L'application est de la seule responsabilité de l'utilisateur." },
      { heading: "5. Exactitude des informations", text: "Les protocoles sont basés sur des sources reconnues mais peuvent ne pas s'appliquer dans tous les contextes. Les développeurs ne garantissent pas l'exactitude ou l'actualité des informations." },
      { heading: "6. Service de nouvelles", text: "Les nouvelles proviennent de sources externes. Les développeurs ne sont pas responsables de leur exactitude ou complétude." },
      { heading: "7. Limitations GPS", text: "La précision GPS dépend de l'appareil et des conditions. L'envoi de SMS nécessite un signal cellulaire actif. Les développeurs ne garantissent pas la livraison des messages d'urgence." },
      { heading: "8. Exonération de responsabilité", text: "Les développeurs n'assument aucune responsabilité pour les dommages directs ou indirects, blessures, perte de membre, invalidité ou décès résultant de l'utilisation de cette application." },
      { heading: "9. Acceptation", text: "En cochant la case d'acceptation, l'utilisateur déclare avoir lu et accepté intégralement ces conditions." },
    ],
    checkLabel: "J'ai lu et j'accepte intégralement les conditions ci-dessus",
    btnLabel: "J'ACCEPTE ET CONTINUE",
    scrollWarning: "↓ Veuillez lire jusqu'à la fin avant d'accepter",
  },
  pt: {
    title: "AVISO LEGAL E ISENÇÃO DE RESPONSABILIDADE",
    sections: [
      { heading: "1. Natureza do Aplicativo", text: "SentinelGuardian é uma ferramenta educacional projetada para aumentar as chances de sobrevivência em catástrofes. Este aplicativo NÃO garante o bem-estar nem a sobrevivência dos usuários em nenhuma circunstância." },
      { heading: "2. Perfil SOS e Contatos de Emergência", text: "O botão SOS funciona EXCLUSIVAMENTE quando o usuário registrou pelo menos dois contatos de emergência. Se o Perfil SOS estiver incompleto, o app NÃO poderá enviar alertas. Os desenvolvedores não assumem responsabilidade pela omissão de preenchimento do perfil." },
      { heading: "3. Dependência do Dispositivo e Rede", text: "Requer: (a) smartphone com GPS funcional; (b) bateria suficiente; (c) cobertura celular para SMS; (d) conexão à internet para funções online. Os desenvolvedores não são responsáveis por falhas técnicas do dispositivo." },
      { heading: "4. Informações Médicas e de Primeiros Socorros", text: "O conteúdo médico é apenas educativo. NÃO substitui cuidados médicos profissionais nem treinamento certificado. A aplicação é de exclusiva responsabilidade do usuário." },
      { heading: "5. Exatidão das Informações", text: "Os protocolos baseiam-se em fontes reconhecidas mas podem não se aplicar a todos os contextos. Os desenvolvedores não garantem que as informações estejam atualizadas." },
      { heading: "6. Serviço de Notícias", text: "As notícias provêm de fontes externas. Os desenvolvedores não são responsáveis por sua precisão ou completude." },
      { heading: "7. Limitações do GPS", text: "A precisão do GPS depende do dispositivo e das condições. O envio de SMS requer sinal celular ativo. Os desenvolvedores não garantem a entrega de mensagens de emergência." },
      { heading: "8. Isenção de Responsabilidade", text: "Os desenvolvedores não assumem nenhuma responsabilidade por danos, lesões físicas, perda de membros, invalidez ou morte resultantes do uso deste aplicativo." },
      { heading: "9. Aceitação", text: "Ao marcar a caixa de aceitação, o usuário declara ter lido e aceito integralmente estes termos." },
    ],
    checkLabel: "Li e aceito integralmente os termos acima",
    btnLabel: "ACEITO E CONTINUAR",
    scrollWarning: "↓ Por favor, leia até o final antes de aceitar",
  },
  it: {
    title: "AVVISO LEGALE E CLAUSOLA DI ESCLUSIONE",
    sections: [
      { heading: "1. Natura dell'applicazione", text: "SentinelGuardian è uno strumento educativo per aumentare le probabilità di sopravvivenza nelle catastrofi. NON garantisce il benessere né la sopravvivenza degli utenti in nessuna circostanza." },
      { heading: "2. Profilo SOS e contatti di emergenza", text: "Il pulsante SOS funziona ESCLUSIVAMENTE quando l'utente ha registrato almeno due contatti di emergenza. Se il Profilo SOS è incompleto, l'app NON potrà inviare avvisi. Gli sviluppatori non assumono alcuna responsabilità per l'omissione." },
      { heading: "3. Dipendenza dal dispositivo e dalla rete", text: "Richiede: (a) smartphone con GPS funzionante; (b) batteria sufficiente; (c) copertura cellulare per SMS; (d) connessione internet per funzioni online. Gli sviluppatori non sono responsabili di guasti tecnici." },
      { heading: "4. Informazioni mediche e di primo soccorso", text: "Il contenuto medico è solo educativo. NON sostituisce cure mediche professionali né formazione certificata. L'applicazione è responsabilità esclusiva dell'utente." },
      { heading: "5. Accuratezza delle informazioni", text: "I protocolli si basano su fonti riconosciute ma potrebbero non applicarsi in tutti i contesti. Gli sviluppatori non garantiscono che le informazioni siano aggiornate." },
      { heading: "6. Servizio notizie", text: "Le notizie provengono da fonti esterne. Gli sviluppatori non sono responsabili della loro accuratezza o completezza." },
      { heading: "7. Limitazioni GPS", text: "L'accuratezza del GPS dipende dal dispositivo e dalle condizioni. L'invio di SMS richiede segnale cellulare attivo. Gli sviluppatori non garantiscono la consegna dei messaggi di emergenza." },
      { heading: "8. Esclusione di responsabilità", text: "Gli sviluppatori non assumono alcuna responsabilità per danni, lesioni, perdita di arti, disabilità o morte derivanti dall'uso di questa applicazione." },
      { heading: "9. Accettazione", text: "Spuntando la casella di accettazione, l'utente dichiara di aver letto e accettato integralmente questi termini." },
    ],
    checkLabel: "Ho letto e accetto integralmente i termini di cui sopra",
    btnLabel: "ACCETTO E CONTINUO",
    scrollWarning: "↓ Si prega di leggere fino in fondo prima di accettare",
  },
  ar: {
    title: "إشعار قانوني وإخلاء مسؤولية",
    sections: [
      { heading: "١. طبيعة التطبيق", text: "SentinelGuardian هو أداة تعليمية لزيادة فرص البقاء في حالات الكوارث. هذا التطبيق لا يضمن سلامة أو بقاء مستخدميه في أي ظرف من الظروف." },
      { heading: "٢. ملف SOS وجهات الاتصال في حالات الطوارئ", text: "يعمل زر SOS فقط عندما يكون المستخدم قد سجّل جهتَي اتصال طوارئ على الأقل. إذا كان الملف غير مكتمل، لن يتمكن التطبيق من إرسال تنبيهات. لا يتحمل المطورون أي مسؤولية عن الإهمال في إكمال الملف." },
      { heading: "٣. الاعتماد على الجهاز والشبكة", text: "يتطلب التطبيق: (أ) هاتف ذكي بنظام GPS; (ب) بطارية كافية; (ج) تغطية خلوية لإرسال الرسائل النصية; (د) اتصال بالإنترنت للوظائف الإلكترونية. المطورون غير مسؤولين عن أي إخفاقات تقنية." },
      { heading: "٤. المعلومات الطبية والإسعافات الأولية", text: "المحتوى الطبي تعليمي فقط. لا يُغني عن الرعاية الطبية المتخصصة ولا عن التدريب المعتمد على الإسعافات الأولية. التطبيق مسؤولية المستخدم حصراً." },
      { heading: "٥. دقة المعلومات", text: "تستند البروتوكولات إلى مصادر موثوقة لكنها قد لا تنطبق على جميع السياقات. لا يضمن المطورون دقة أو حداثة المعلومات." },
      { heading: "٦. خدمة الأخبار", text: "تأتي الأخبار من مصادر خارجية خارج سيطرة المطورين. المطورون غير مسؤولين عن دقتها أو اكتمالها." },
      { heading: "٧. قيود GPS", text: "تعتمد دقة GPS على الجهاز والظروف. إرسال الرسائل النصية يتطلب إشارة خلوية. لا يضمن المطورون تسليم رسائل الطوارئ." },
      { heading: "٨. إخلاء المسؤولية", text: "لا يتحمل مطورو SentinelGuardian أي مسؤولية عن الأضرار أو الإصابات أو فقدان الأطراف أو الإعاقة أو الوفاة الناجمة عن استخدام هذا التطبيق." },
      { heading: "٩. القبول", text: "بتحديد مربع القبول، يُقرّ المستخدم بأنه قرأ وقبل هذه الشروط كاملة." },
    ],
    checkLabel: "لقد قرأت وأوافق على الشروط المذكورة أعلاه",
    btnLabel: "أوافق وأتابع",
    scrollWarning: "↓ يرجى القراءة حتى النهاية قبل القبول",
  },
  zh: {
    title: "法律声明与免责条款",
    sections: [
      { heading: "一、应用程序性质", text: "SentinelGuardian是一款旨在提高灾难中生存概率的教育工具。本应用程序在任何情况下均不保证用户的安全或生存。" },
      { heading: "二、SOS档案与紧急联系人", text: "SOS按钮仅在用户已注册至少两个紧急联系人时有效。若SOS档案不完整，应用将无法发送警报。开发者不对用户未完善档案所造成的后果承担任何责任。" },
      { heading: "三、设备与网络依赖性", text: "正常运行需要：(a) 配备GPS的智能手机；(b) 充足电量；(c) 用于短信的蜂窝网络覆盖；(d) 互联网连接以使用在线功能。开发者不对设备故障或技术限制承担责任。" },
      { heading: "四、医疗与急救信息", text: "应用中的医疗内容仅供参考，不能替代专业医疗护理或认证急救培训。内容的应用由用户自行负责。" },
      { heading: "五、信息准确性", text: "协议和建议基于公认来源，但可能不适用于所有情况。开发者不保证信息的时效性或适用性。" },
      { heading: "六、新闻服务", text: "新闻来自外部来源，开发者无法控制。开发者不对其准确性或完整性承担责任。" },
      { heading: "七、GPS限制", text: "GPS精度取决于设备和条件。短信发送需要蜂窝信号。开发者不保证紧急消息的送达。" },
      { heading: "八、免责声明", text: "SentinelGuardian开发者不对因使用本应用程序引起的任何损害、伤害、肢体损失、残疾或死亡承担任何责任。" },
      { heading: "九、接受条款", text: "勾选接受框即表示用户已阅读并完全接受上述条款。" },
    ],
    checkLabel: "我已阅读并完全接受上述条款",
    btnLabel: "我接受并继续",
    scrollWarning: "↓ 请阅读至末尾后再接受",
  },
};

const DISCLAIMER_KEY = "sg_disclaimer_accepted";

export default function DisclaimerScreen({ onAccept }) {
  const { lang } = useLang();
  const d = DISCLAIMER[lang] || DISCLAIMER.en;
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(() => {
    try { return !!localStorage.getItem(DISCLAIMER_KEY); } catch { return false; }
  });

  if (accepted) return null;

  const handleScroll = (e) => {
    const el = e.target;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 40) {
      setScrolledToEnd(true);
    }
  };

  const handleAccept = () => {
    if (!checked) return;
    try { localStorage.setItem(DISCLAIMER_KEY, "1"); } catch {}
    setAccepted(true);
    if (onAccept) onAccept();
  };

  return (
    <div className="fixed inset-0 z-[199] bg-zinc-950 flex flex-col" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🛡️</span>
          <h1 className="font-military text-sm text-primary tracking-widest uppercase">SentinelGuardian</h1>
        </div>
        <h2 className="font-military text-base text-white tracking-wide">{d.title}</h2>
        {!scrolledToEnd && (
          <p className="text-xs text-yellow-400 mt-1 animate-pulse">{d.scrollWarning}</p>
        )}
      </div>

      {/* Contenido scrolleable */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4 space-y-5"
        onScroll={handleScroll}
      >
        {d.sections.map((s, i) => (
          <div key={i}>
            <h3 className="text-sm font-bold text-primary mb-1">{s.heading}</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{s.text}</p>
          </div>
        ))}
        <div className="h-4" />
      </div>

      {/* Footer con checkbox y botón */}
      <div className="px-5 py-5 border-t border-zinc-800 bg-zinc-950 shrink-0 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            disabled={!scrolledToEnd}
            className="mt-1 w-5 h-5 rounded accent-primary shrink-0"
          />
          <span className={`text-sm leading-snug ${scrolledToEnd ? "text-zinc-200" : "text-zinc-500"}`}>
            {d.checkLabel}
          </span>
        </label>
        <button
          onClick={handleAccept}
          disabled={!checked || !scrolledToEnd}
          className={`w-full py-4 rounded-xl font-military text-sm tracking-widest uppercase transition-all ${
            checked && scrolledToEnd
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {d.btnLabel}
        </button>
      </div>
    </div>
  );
}
