const STORAGE_KEY = 'work-supervision-v1';
const DIRECTIONS = ['ПСТБИ', 'Школы', 'Олимпиады'];
const CRM_STAGES = ['неразобранные','нет связи','думает','жду обратной связи','ждет собеседования','к владыке','не прошел фильтр','Прошел собеседование','в беседе абитуриентов','не в ПСТБИ','28+'];
const MONTH_RESULTS = ['','Готово','Частично','Не сделано','Перенесено','Снято'];
const WORK_STATUSES = ['Запланировано','В работе','Ожидание','К согласованию','Заблокировано','Завершено'];
const PRIORITIES = ['','Высокий','Средний','Низкий'];
const TASK_TYPES = ['Задача','Группа задач','Предложение'];

const seed = {
  version: 1,
  projects: [
    {code:'1.1', direction:'ПСТБИ', name:'Работа с базой CRM', type:'Постоянная работа'},
    {code:'1.2.1', direction:'ПСТБИ', name:'Трёхдневный практикум', type:'Проект'},
    {code:'1.2.2', direction:'ПСТБИ', name:'Эфиры', type:'Проект'},
    {code:'1.2.3', direction:'ПСТБИ', name:'День открытых дверей (ДОД)', type:'Проект'},
    {code:'1.3.1', direction:'ПСТБИ', name:'Работа над сайтом', type:'Проект'},
    {code:'1.3.2', direction:'ПСТБИ', name:'Мерч', type:'Проект'},
    {code:'2.1', direction:'Школы', name:'Конференция для руководителей школ', type:'Проект'},
    {code:'2.2', direction:'Школы', name:'Привезти две школы в Лихов', type:'Проект'},
    {code:'2.3', direction:'Школы', name:'Два круглых стола с учителями-предметниками', type:'Проект'},
    {code:'2.4', direction:'Школы', name:'Сайт / портал для школ-партнёров', type:'Проект'},
    {code:'3.1', direction:'Олимпиады', name:'Присутствие на мероприятиях олимпиады', type:'Постоянная работа'}
  ],
  tasks: [
    {id:'1.1-01', direction:'ПСТБИ', projectCode:'1.1', title:'Поддерживать базу CRM и зафиксировать состояние и сделки по стадиям за месяц.', parentId:'', type:'Задача'},
    {id:'1.2.1-01', direction:'ПСТБИ', projectCode:'1.2.1', title:'Провести запланированное собрание по трёхдневному практикуму.', parentId:'', type:'Задача'},
    {id:'1.2.2-01', direction:'ПСТБИ', projectCode:'1.2.2', title:'Провести первый эфир.', parentId:'', type:'Задача'},
    {id:'1.2.3-01', direction:'ПСТБИ', projectCode:'1.2.3', title:'Провести день открытых дверей.', parentId:'', type:'Задача'},
    {id:'1.3.1-01', direction:'ПСТБИ', projectCode:'1.3.1', title:'Снять три ролика для сайта с Никитой.', parentId:'', type:'Задача'},
    {id:'1.3.2-01', direction:'ПСТБИ', projectCode:'1.3.2', title:'Начать работу над мерчем.', parentId:'', type:'Предложение'},
    {id:'2.1-01', direction:'Школы', projectCode:'2.1', title:'Провести встречу с И. В. Павлюткиным по конференции для руководителей школ.', parentId:'', type:'Задача'},
    {id:'2.2-01', direction:'Школы', projectCode:'2.2', title:'Привезти две школы в Лихов переулок.', parentId:'', type:'Группа задач'},
    {id:'2.2-01.1', direction:'Школы', projectCode:'2.2', title:'Организовать приезд первой школы в Лихов переулок.', parentId:'2.2-01', type:'Задача'},
    {id:'2.2-01.2', direction:'Школы', projectCode:'2.2', title:'Организовать приезд второй школы в Лихов переулок.', parentId:'2.2-01', type:'Задача'},
    {id:'2.3-01', direction:'Школы', projectCode:'2.3', title:'Провести два круглых стола с учителями-предметниками.', parentId:'', type:'Группа задач'},
    {id:'2.3-01.1', direction:'Школы', projectCode:'2.3', title:'Провести первый круглый стол с учителями-предметниками.', parentId:'2.3-01', type:'Задача'},
    {id:'2.3-01.2', direction:'Школы', projectCode:'2.3', title:'Провести второй круглый стол с учителями-предметниками.', parentId:'2.3-01', type:'Задача'},
    {id:'2.4-01', direction:'Школы', projectCode:'2.4', title:'Определить первый этап создания сайта / портала для школ-партнёров.', parentId:'', type:'Предложение'},
    {id:'3.1-01', direction:'Олимпиады', projectCode:'3.1', title:'Принять участие в мероприятии олимпиады.', parentId:'', type:'Задача'}
  ],
  taskMonths: [
    {taskId:'1.1-01', month:'2026-09', planned:'Поддерживать базу CRM и зафиксировать состояние и сделки по стадиям за месяц.', deadline:'', priority:'', status:'В работе', monthResult:'', actual:'Работа с CRM ведётся в течение всего года.', blocker:'Показатели и состояние базы пока не внесены.', nextStep:'Заполнить строку сентября на экране CRM; далее добавлять срез каждый месяц.', carryTo:''},
    {taskId:'1.2.2-01', month:'2026-09', planned:'Провести первый эфир.', deadline:'2026-09-30', priority:'', status:'Запланировано', monthResult:'', actual:'Даты эфиров запланированы, анонсы опубликованы.', blocker:'Время эфира не указано.', nextStep:'Провести первый эфир и зафиксировать результат.', carryTo:''}
  ],
  crm: [{month:'2026-09', snapshotDate:'', stages:Object.fromEntries(CRM_STAGES.map(s=>[s,''])), state:'', changes:'', problems:'', nextStep:''}],
  meetings: [{month:'2026-09', date:'', keyResults:'', difficulties:'', decisions:'', nextFocus:'', nextMeeting:''}]
};

let state = loadState();
let ui = { page:'dashboard', month: currentMonth(), taskDirection:'', taskProject:'', taskStatus:'', taskSearch:'', compareMonth: prevMonth(currentMonth()), modal:null, editTaskId:null, reportFrom:'2026-09', reportTo:currentMonth() };

function clone(v){ return JSON.parse(JSON.stringify(v)); }
function loadState(){
  try { const x = JSON.parse(localStorage.getItem(STORAGE_KEY)); return x?.version ? x : clone(seed); }
  catch { return clone(seed); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function currentMonth(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function prevMonth(m){ let [y,mo]=m.split('-').map(Number); mo--; if(mo===0){mo=12;y--;} return `${y}-${String(mo).padStart(2,'0')}`; }
function nextMonth(m){ let [y,mo]=m.split('-').map(Number); mo++; if(mo===13){mo=1;y++;} return `${y}-${String(mo).padStart(2,'0')}`; }
function monthLabel(m){ if(!m) return 'Без месяца'; const [y,mo]=m.split('-'); return new Intl.DateTimeFormat('ru-RU',{month:'long',year:'numeric'}).format(new Date(Number(y),Number(mo)-1,1)); }
function escapeHtml(s=''){ return String(s).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }
function projectName(code){ const p=state.projects.find(x=>x.code===code); return p ? `${p.code} ${p.name}` : code; }
function getTask(id){ return state.tasks.find(t=>t.id===id); }
function getMonthRecord(taskId, month){ return state.taskMonths.find(r=>r.taskId===taskId && r.month===month); }
function actionableTask(t){ return t.type === 'Задача'; }
function resultBadge(v){
  const map={'Готово':'green','Частично':'amber','Не сделано':'red','Перенесено':'blue','Снято':'gray'};
  return v ? `<span class="badge ${map[v]||'gray'}">${escapeHtml(v)}</span>` : '<span class="badge gray">Без итога</span>';
}
function statusBadge(v){ const map={'В работе':'blue','Запланировано':'gray','Ожидание':'amber','К согласованию':'purple','Заблокировано':'red','Завершено':'green'}; return `<span class="badge ${map[v]||'gray'}">${escapeHtml(v||'—')}</span>`; }
function priorityBadge(v){ const map={'Высокий':'red','Средний':'amber','Низкий':'gray'}; return v?`<span class="badge ${map[v]||'gray'}">${escapeHtml(v)}</span>`:'—'; }
function options(items, selected, blank='—'){ return (blank!==null?`<option value="">${blank}</option>`:'')+items.map(x=>`<option value="${escapeHtml(x)}" ${x===selected?'selected':''}>${escapeHtml(x)}</option>`).join(''); }
function nextTaskId(projectCode){
  const base=state.tasks.filter(t=>t.projectCode===projectCode && !t.parentId).map(t=>t.id);
  let max=0; base.forEach(id=>{ const m=id.match(/-(\d+)$/); if(m) max=Math.max(max,Number(m[1])); });
  return `${projectCode}-${String(max+1).padStart(2,'0')}`;
}
function taskRecordsForMonth(month){ return state.taskMonths.filter(r=>r.month===month).map(r=>({r,t:getTask(r.taskId)})).filter(x=>x.t && actionableTask(x.t)); }
function countSummary(month){
  const list=taskRecordsForMonth(month);
  const out={total:list.length, done:0, partial:0, failed:0, carried:0, dropped:0, open:0};
  list.forEach(({r})=>{ const key={'Готово':'done','Частично':'partial','Не сделано':'failed','Перенесено':'carried','Снято':'dropped'}[r.monthResult]; if(key) out[key]++; else out.open++; });
  return out;
}
function directionSummary(month, direction){
  const list=taskRecordsForMonth(month).filter(x=>x.t.direction===direction); const done=list.filter(x=>x.r.monthResult==='Готово').length; return {total:list.length, done};
}
function crmTotal(snapshot){ if(!snapshot) return null; let vals=CRM_STAGES.map(s=>snapshot.stages?.[s]); if(vals.some(v=>v===''||v===null||v===undefined)) return null; return vals.reduce((a,b)=>a+Number(b||0),0); }
function ensureCrm(month){ let x=state.crm.find(c=>c.month===month); if(!x){ x={month,snapshotDate:'',stages:Object.fromEntries(CRM_STAGES.map(s=>[s,''])),state:'',changes:'',problems:'',nextStep:''}; state.crm.push(x); saveState(); } return x; }
function ensureMeeting(month){ let x=state.meetings.find(c=>c.month===month); if(!x){ x={month,date:'',keyResults:'',difficulties:'',decisions:'',nextFocus:'',nextMeeting:''}; state.meetings.push(x); saveState(); } return x; }

const pageInfo = {
  dashboard:['Обзор месяца','План, фактический результат и то, что нужно перенести дальше.'],
  tasks:['Задачи','Добавляйте задачи, назначайте месяц и сохраняйте историю по каждому месяцу.'],
  projects:['Проекты','Справочник проектов внутри трёх направлений работы.'],
  compare:['Сравнение месяцев','Сверка результатов и динамики от месяца к месяцу.'],
  crm:['CRM ПСТБИ','Ежемесячный срез базы по 11 стадиям из вашей таблицы.'],
  meetings:['Супервизии','Итоги встреч, решения руководителя и фокус следующего месяца.'],
  reports:['Выгрузка','Сформируйте отчёт за любой период от одного месяца и сохраните данные.']
};

function render(){
  const [title, subtitle]=pageInfo[ui.page];
  document.querySelector('#app').innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand"><h1>Супервизия</h1><p>ПСТБИ · Школы · Олимпиады<br>Личный рабочий трекер</p></div>
        <nav class="nav">
          ${navBtn('dashboard','Обзор')}${navBtn('tasks','Задачи')}${navBtn('projects','Проекты')}${navBtn('compare','Сравнение')}${navBtn('crm','CRM ПСТБИ')}${navBtn('meetings','Супервизии')}${navBtn('reports','Выгрузка')}
        </nav>
        <div class="sidebar-footer">Данные хранятся в этом браузере.<br>Регулярно делайте резервную копию JSON.</div>
      </aside>
      <main class="main">
        <div class="topbar">
          <div><h1 class="page-title">${title}</h1><p class="page-subtitle">${subtitle}</p></div>
          <div class="toolbar">${pageToolbar()}</div>
        </div>
        ${renderPage()}
      </main>
      ${renderModal()}
    </div>`;
  bind();
}
function navBtn(page,label){ return `<button data-nav="${page}" class="${ui.page===page?'active':''}">${label}</button>`; }
function pageToolbar(){
  if(['dashboard','tasks','crm','meetings'].includes(ui.page)) return `<div class="month-picker"><button class="btn small" data-month-prev>←</button><input type="month" id="globalMonth" value="${ui.month}"><button class="btn small" data-month-next>→</button></div>${['dashboard','tasks'].includes(ui.page)?'<button class="btn primary" data-add-task>+ Задача</button><button class="btn" data-close-month>Закрыть месяц</button>':''}`;
  if(ui.page==='projects') return '<button class="btn primary" data-add-project>+ Проект</button>';
  return '';
}
function renderPage(){ return ({dashboard:renderDashboard,tasks:renderTasks,projects:renderProjects,compare:renderCompare,crm:renderCrm,meetings:renderMeetings,reports:renderReports})[ui.page](); }

function parseLocalDate(s){ if(!s) return null; const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); }
function startOfToday(){ const n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); }
function daysFromToday(dateString){ const d=parseLocalDate(dateString); if(!d)return null; return Math.round((d-startOfToday())/86400000); }
function isClosedRecord(r){ return r.monthResult==='Готово'||r.monthResult==='Снято'||r.status==='Завершено'; }
function attentionScore(r){
  if(r.status==='Заблокировано') return 0;
  const days=daysFromToday(r.deadline);
  if(days!==null&&days<0&&!isClosedRecord(r)) return 1;
  if(r.priority==='Высокий') return 2;
  if(r.status==='К согласованию') return 3;
  if(r.status==='Ожидание') return 4;
  if(r.status==='В работе') return 5;
  return 9;
}
function renderDashboard(){
  const s=countSummary(ui.month);
  const records=taskRecordsForMonth(ui.month);
  const crm=state.crm.find(c=>c.month===ui.month); const totalCrm=crmTotal(crm);
  const prev=state.crm.find(c=>c.month===prevMonth(ui.month)); const prevTotal=crmTotal(prev); const delta=(totalCrm!==null&&prevTotal!==null)?totalCrm-prevTotal:null;
  const overdue=records.filter(({r})=>{const d=daysFromToday(r.deadline); return d!==null&&d<0&&!isClosedRecord(r);}).sort((a,b)=>a.r.deadline.localeCompare(b.r.deadline));
  const next7=records.filter(({r})=>{const d=daysFromToday(r.deadline); return d!==null&&d>=0&&d<=7&&!isClosedRecord(r);}).sort((a,b)=>a.r.deadline.localeCompare(b.r.deadline));
  const attention=records.filter(({r})=>!isClosedRecord(r)&&['В работе','Ожидание','К согласованию','Заблокировано'].includes(r.status)).sort((a,b)=>attentionScore(a.r)-attentionScore(b.r));
  const incoming=taskRecordsForMonth(prevMonth(ui.month)).filter(({r})=>r.monthResult==='Перенесено'&&(r.carryTo===ui.month||getMonthRecord(r.taskId,ui.month)));
  const open=records.filter(({r})=>!r.monthResult);
  const carried=records.filter(({r})=>r.monthResult==='Перенесено');
  const meeting=state.meetings.find(m=>m.month===ui.month);
  const filledStages=crm?CRM_STAGES.filter(stage=>crm.stages?.[stage]!==''&&crm.stages?.[stage]!==null&&crm.stages?.[stage]!==undefined).length:0;
  const activeProjects=new Set(records.filter(({r})=>!isClosedRecord(r)).map(({t})=>t.projectCode)).size;
  return `
    <div class="dashboard-hero card">
      <div><div class="eyebrow">${monthLabel(ui.month)}</div><h2>Рабочий центр месяца</h2><p>Сначала — задачи, которые требуют решения. Ниже — прогресс, переносы и состояние CRM.</p></div>
      <div class="hero-actions"><button class="btn primary" data-add-task>+ Добавить задачу</button><button class="btn" data-close-month>Закрыть месяц</button><button class="btn" data-nav="crm">Обновить CRM</button><button class="btn" data-nav="reports">Сформировать отчёт</button></div>
    </div>
    <div class="grid kpi section compact-section">
      ${kpi('В плане',s.total,`${activeProjects} активных проектов`)}
      ${kpi('Готово',s.done,s.total?`${Math.round(s.done/s.total*100)}% плана`:'Нет задач')}
      ${kpi('Просрочено',overdue.length,overdue.length?'Требует внимания':'Просрочек нет',overdue.length?'danger':'')}
      ${kpi('CRM',totalCrm===null?'—':totalCrm,totalCrm===null?`${filledStages} из ${CRM_STAGES.length} стадий заполнено`:(delta===null?'Нет полного среза прошлого месяца':`${delta>=0?'+':''}${delta} к прошлому месяцу`))}
    </div>
    <div class="grid two section dashboard-priority-grid">
      <div class="card attention-card">
        <div class="section-head"><div><div class="eyebrow">Сейчас</div><h2>Требует внимания</h2></div><span class="badge ${attention.length?'purple':'green'}">${attention.length}</span></div>
        ${attention.length?dashboardTaskList(attention.slice(0,8),'attention'):'<div class="empty compact">Нет задач в работе, ожидании, согласовании или блокировке.</div>'}
      </div>
      <div class="card ${overdue.length?'danger-card':''}">
        <div class="section-head"><div><div class="eyebrow">Сроки</div><h2>Просрочено</h2></div><span class="badge ${overdue.length?'red':'green'}">${overdue.length}</span></div>
        ${overdue.length?dashboardTaskList(overdue.slice(0,8),'deadline'):'<div class="empty compact">По задачам с указанными сроками просрочек нет.</div>'}
        ${next7.length?`<div class="subsection-title">Ближайшие 7 дней</div>${dashboardTaskList(next7.slice(0,5),'deadline')}`:''}
      </div>
    </div>
    <div class="section">
      <div class="section-head"><h2>Прогресс по направлениям</h2><span class="muted">нажмите на направление, чтобы открыть задачи</span></div>
      <div class="direction-strip">${DIRECTIONS.map(d=>{const x=directionSummary(ui.month,d);const p=x.total?Math.round(x.done/x.total*100):0;return `<button class="direction-card direction-button" data-dashboard-direction="${d}"><div class="direction-top"><h3>${d}</h3><strong>${p}%</strong></div><div class="bar"><div style="width:${p}%"></div></div><div class="numbers"><span>${x.done} готово</span><span>${x.total} всего</span></div></button>`}).join('')}</div>
    </div>
    <div class="grid two section">
      <div class="card"><div class="section-head"><div><div class="eyebrow">Переход месяца</div><h2>Пришло из прошлого месяца</h2></div><span class="badge ${incoming.length?'amber':'gray'}">${incoming.length}</span></div>${incoming.length?dashboardTaskList(incoming.slice(0,7),'carry'):'<div class="empty compact">Нет задач, перенесённых из прошлого месяца.</div>'}</div>
      <div class="card"><div class="section-head"><div><div class="eyebrow">Закрытие месяца</div><h2>Нужно подвести итог</h2></div><span class="badge ${open.length?'amber':'green'}">${open.length}</span></div>${open.length?dashboardTaskList(open.slice(0,7),'status'):'<div class="empty compact">У всех задач указан итог месяца.</div>'}</div>
    </div>
    <div class="grid two section">
      <div class="card crm-dashboard-card">
        <div class="section-head"><div><div class="eyebrow">ПСТБИ</div><h2>CRM за месяц</h2></div><button class="link-btn" data-nav="crm">Открыть CRM</button></div>
        <div class="crm-dashboard-row"><div><div class="crm-dashboard-number">${totalCrm===null?'—':totalCrm}</div><div class="muted">всего сделок</div></div><div><div class="crm-dashboard-number small">${filledStages}/${CRM_STAGES.length}</div><div class="muted">стадий заполнено</div></div></div>
        ${crm?.nextStep?`<div class="focus-box"><b>Следующий шаг</b><p>${escapeHtml(crm.nextStep)}</p></div>`:'<div class="notice">Добавьте срез CRM и следующий шаг на соответствующем экране.</div>'}
      </div>
      <div class="card">
        <div class="section-head"><div><div class="eyebrow">Дальше</div><h2>Фокус следующего месяца</h2></div><button class="link-btn" data-nav="meetings">Супервизия</button></div>
        ${meeting?.nextFocus?`<div class="next-focus">${escapeHtml(meeting.nextFocus)}</div>`:'<div class="empty compact">Фокус ещё не зафиксирован. Его можно указать в разделе «Супервизии».</div>'}
        ${carried.length?`<div class="subsection-title">Уже отмечено к переносу: ${carried.length}</div>${dashboardTaskList(carried.slice(0,4),'carry')}`:''}
      </div>
    </div>`;
}
function kpi(label,value,hint,tone=''){ return `<div class="card kpi-card ${tone?`kpi-${tone}`:''}"><div class="label">${label}</div><div class="value">${value}</div><div class="hint">${hint}</div></div>`; }
function miniTaskList(items){ return `<div class="stat-list">${items.map(({t,r})=>`<div class="stat-row"><span><b>${escapeHtml(t.id)}</b> ${escapeHtml(t.title)}</span><span>${r.monthResult?resultBadge(r.monthResult):statusBadge(r.status)}</span></div>`).join('')}</div>`; }
function dashboardTaskList(items,mode='status'){
  return `<div class="dashboard-task-list">${items.map(({t,r})=>{
    let meta='';
    if(mode==='deadline'&&r.deadline){const days=daysFromToday(r.deadline);meta=`<span class="task-date ${days<0?'late':''}">${formatDate(r.deadline)}${days<0?` · ${Math.abs(days)} дн. проср.`:days===0?' · сегодня':days===1?' · завтра':` · через ${days} дн.`}</span>`;}
    else if(mode==='carry') meta=`<span class="muted">${escapeHtml(projectName(t.projectCode))}</span>`;
    else meta=r.monthResult?resultBadge(r.monthResult):statusBadge(r.status);
    return `<button class="dashboard-task" data-dashboard-task="${escapeHtml(t.id)}"><span class="task-main"><span class="task-id">${escapeHtml(t.id)}</span><span class="task-title">${escapeHtml(t.title)}</span></span><span class="task-meta">${meta}</span></button>`;
  }).join('')}</div>`;
}

function renderTasks(){
  const projectOptions = state.projects.filter(p=>!ui.taskDirection||p.direction===ui.taskDirection);
  let rows = state.tasks.map(t=>({t,r:getMonthRecord(t.id,ui.month)})).filter(x=>x.r);
  if(ui.taskDirection) rows=rows.filter(x=>x.t.direction===ui.taskDirection);
  if(ui.taskProject) rows=rows.filter(x=>x.t.projectCode===ui.taskProject);
  if(ui.taskStatus) rows=rows.filter(x=>x.r.status===ui.taskStatus || x.r.monthResult===ui.taskStatus);
  if(ui.taskSearch){ const q=ui.taskSearch.toLowerCase(); rows=rows.filter(x=>(x.t.id+' '+x.t.title+' '+projectName(x.t.projectCode)).toLowerCase().includes(q)); }
  rows.sort((a,b)=>a.t.direction.localeCompare(b.t.direction,'ru')||a.t.id.localeCompare(b.t.id,'ru'));
  return `
    <div class="filters">
      <select id="filterDirection">${options(DIRECTIONS,ui.taskDirection,'Все направления')}</select>
      <select id="filterProject"><option value="">Все проекты</option>${projectOptions.map(p=>`<option value="${p.code}" ${p.code===ui.taskProject?'selected':''}>${escapeHtml(p.code+' '+p.name)}</option>`).join('')}</select>
      <input id="filterSearch" placeholder="Поиск по задаче…" value="${escapeHtml(ui.taskSearch)}">
      <select id="filterStatus">${options([...WORK_STATUSES,...MONTH_RESULTS.filter(Boolean)],ui.taskStatus,'Все статусы')}</select>
    </div>
    <div class="table-wrap"><table><thead><tr><th>ID</th><th>Направление / проект</th><th>Задача</th><th>Срок</th><th>Статус</th><th>Итог месяца</th><th></th></tr></thead><tbody>
      ${rows.length?rows.map(({t,r})=>`<tr><td><b>${escapeHtml(t.id)}</b>${t.parentId?`<div class="muted">↳ ${escapeHtml(t.parentId)}</div>`:''}</td><td><b>${escapeHtml(t.direction)}</b><div class="muted">${escapeHtml(projectName(t.projectCode))}</div></td><td><div class="row-title">${escapeHtml(t.title)}</div>${r.nextStep?`<div class="muted">Дальше: ${escapeHtml(r.nextStep)}</div>`:''}</td><td>${r.deadline?formatDate(r.deadline):'—'}<div>${priorityBadge(r.priority)}</div></td><td>${statusBadge(r.status)}</td><td>${resultBadge(r.monthResult)}${r.carryTo?`<div class="muted">→ ${monthLabel(r.carryTo)}</div>`:''}</td><td><div class="actions"><button class="btn small" data-edit-task="${t.id}">Открыть</button><button class="btn small" data-copy-task="${t.id}">→ месяц</button></div></td></tr>`).join(''):`<tr><td colspan="7"><div class="empty">В ${monthLabel(ui.month)} пока нет задач. Добавьте новую или включите задачу из списка ниже.</div></td></tr>`}
    </tbody></table></div>
    ${renderBacklog()}`;
}
function renderBacklog(){
  let items=state.tasks.filter(t=>!getMonthRecord(t.id,ui.month));
  if(ui.taskDirection)items=items.filter(t=>t.direction===ui.taskDirection);
  if(ui.taskProject)items=items.filter(t=>t.projectCode===ui.taskProject);
  if(ui.taskSearch){const q=ui.taskSearch.toLowerCase();items=items.filter(t=>(t.id+' '+t.title+' '+projectName(t.projectCode)).toLowerCase().includes(q));}
  if(!items.length)return '';
  return `<div class="section"><div class="section-head"><h2>Не в плане ${monthLabel(ui.month)}</h2><span class="muted">${items.length} записей</span></div><div class="table-wrap"><table><thead><tr><th>ID</th><th>Направление / проект</th><th>Задача</th><th>Тип</th><th></th></tr></thead><tbody>${items.map(t=>`<tr><td><b>${escapeHtml(t.id)}</b></td><td><b>${escapeHtml(t.direction)}</b><div class="muted">${escapeHtml(projectName(t.projectCode))}</div></td><td>${escapeHtml(t.title)}</td><td>${escapeHtml(t.type)}</td><td><button class="btn small" data-plan-task="${t.id}">+ В план месяца</button></td></tr>`).join('')}</tbody></table></div></div>`;
}

function renderProjects(){
  const projects=[...state.projects].sort((a,b)=>a.code.localeCompare(b.code,'ru',{numeric:true}));
  return `<div class="notice">Проект — постоянная «папка» для задач. Месяц назначается не проекту, а конкретной задаче.</div><div class="project-tree section">${projects.map(p=>`<div class="project-item"><div class="project-code">${escapeHtml(p.code)}</div><div><b>${escapeHtml(p.name)}</b><div class="muted">${escapeHtml(p.direction)}</div></div><div>${statusBadge(p.type)}</div><div class="actions"><button class="btn small" data-project-task="${p.code}">+ задача</button><button class="btn small danger" data-delete-project="${p.code}">Удалить</button></div></div>`).join('')}</div>`;
}

function renderCompare(){
  const a=countSummary(ui.compareMonth), b=countSummary(ui.month);
  return `
    <div class="toolbar no-print" style="margin-bottom:16px"><div class="field"><label>Предыдущий месяц</label><input type="month" id="compareMonth" value="${ui.compareMonth}"></div><div class="field"><label>Текущий месяц</label><input type="month" id="compareCurrent" value="${ui.month}"></div></div>
    <div class="compare-grid">
      ${compareCard(ui.compareMonth,a)}<div class="compare-mid">→</div>${compareCard(ui.month,b)}
    </div>
    <div class="section"><div class="section-head"><h2>Изменение по направлениям</h2></div><div class="table-wrap"><table><thead><tr><th>Направление</th><th>${monthLabel(ui.compareMonth)}</th><th>${monthLabel(ui.month)}</th><th>Изменение плана</th><th>Готово сейчас</th></tr></thead><tbody>${DIRECTIONS.map(d=>{const x=directionSummary(ui.compareMonth,d), y=directionSummary(ui.month,d); return `<tr><td><b>${d}</b></td><td>${x.total}</td><td>${y.total}</td><td>${y.total-x.total>=0?'+':''}${y.total-x.total}</td><td>${y.done} / ${y.total}</td></tr>`}).join('')}</tbody></table></div></div>
    <div class="section"><div class="section-head"><h2>Перенесённые задачи</h2></div>${renderCarryComparison()}</div>`;
}
function compareCard(month,s){ return `<div class="compare-card"><h3>${monthLabel(month)}</h3><div class="big">${s.total} задач</div><div class="stat-list"><div class="stat-row"><span>Готово</span><b>${s.done}</b></div><div class="stat-row"><span>Частично</span><b>${s.partial}</b></div><div class="stat-row"><span>Не сделано</span><b>${s.failed}</b></div><div class="stat-row"><span>Перенесено</span><b>${s.carried}</b></div><div class="stat-row"><span>Без итога</span><b>${s.open}</b></div></div></div>`; }
function renderCarryComparison(){
  const rows=taskRecordsForMonth(ui.compareMonth).filter(x=>x.r.monthResult==='Перенесено' || x.r.carryTo===ui.month);
  if(!rows.length) return '<div class="empty card">Нет зафиксированных переносов между выбранными месяцами.</div>';
  return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>Задача</th><th>Было</th><th>Стало</th></tr></thead><tbody>${rows.map(({t,r})=>{const nr=getMonthRecord(t.id,ui.month); return `<tr><td><b>${t.id}</b></td><td>${escapeHtml(t.title)}</td><td>${resultBadge(r.monthResult)}</td><td>${nr?statusBadge(nr.status):'<span class="badge red">Не добавлена</span>'}</td></tr>`}).join('')}</tbody></table></div>`;
}

function renderCrm(){
  const c=ensureCrm(ui.month); const total=crmTotal(c); const prev=state.crm.find(x=>x.month===prevMonth(ui.month)); const prevT=crmTotal(prev); const delta=(total!==null&&prevT!==null)?total-prevT:null;
  return `<div class="grid two"><div class="card"><div class="label muted">Всего сделок</div><div class="crm-total">${total===null?'—':total}</div><div class="muted">${delta===null?'Для сравнения нужны два полностью заполненных месяца':`${delta>=0?'+':''}${delta} к ${monthLabel(prevMonth(ui.month))}`}</div></div><div class="card"><div class="field"><label>Дата фактического среза</label><input type="date" id="crmSnapshotDate" value="${c.snapshotDate||''}"></div></div></div>
    <div class="section"><div class="section-head"><h2>Сделки по стадиям</h2><span class="muted">пусто = нет данных; 0 = проверено, сделок нет</span></div><div class="crm-stage-grid">${CRM_STAGES.map(s=>`<div class="crm-stage"><div class="name">${escapeHtml(s)}</div><input type="number" min="0" step="1" data-crm-stage="${escapeHtml(s)}" value="${c.stages[s]}"></div>`).join('')}</div></div>
    <div class="grid two section"><div class="card"><div class="field"><label>Состояние базы</label><textarea id="crmState">${escapeHtml(c.state)}</textarea></div><div class="field"><label>Что сделано / изменилось</label><textarea id="crmChanges">${escapeHtml(c.changes)}</textarea></div></div><div class="card"><div class="field"><label>Проблемы / нужна помощь</label><textarea id="crmProblems">${escapeHtml(c.problems)}</textarea></div><div class="field"><label>Следующий шаг</label><textarea id="crmNextStep">${escapeHtml(c.nextStep)}</textarea></div></div></div>
    <div class="section"><div class="section-head"><h2>История CRM</h2></div>${crmHistory()}</div>`;
}
function crmHistory(){
  const rows=[...state.crm].sort((a,b)=>a.month.localeCompare(b.month));
  return `<div class="table-wrap"><table><thead><tr><th>Месяц</th><th>Срез</th><th>Всего</th><th>Изменение</th><th>Состояние</th></tr></thead><tbody>${rows.map((c,i)=>{const t=crmTotal(c);const pt=i?crmTotal(rows[i-1]):null;const d=t!==null&&pt!==null?t-pt:null;return `<tr><td><b>${monthLabel(c.month)}</b></td><td>${c.snapshotDate?formatDate(c.snapshotDate):'—'}</td><td>${t===null?'—':t}</td><td>${d===null?'—':`${d>=0?'+':''}${d}`}</td><td>${escapeHtml(c.state||'—')}</td></tr>`}).join('')}</tbody></table></div>`;
}

function renderMeetings(){
  const m=ensureMeeting(ui.month);
  return `<div class="grid two"><div class="card"><div class="field"><label>Дата супервизии</label><input type="date" id="meetingDate" value="${m.date||''}"></div><div class="field"><label>Главные результаты месяца</label><textarea id="meetingKeyResults">${escapeHtml(m.keyResults)}</textarea></div><div class="field"><label>Трудности / вопросы руководству</label><textarea id="meetingDifficulties">${escapeHtml(m.difficulties)}</textarea></div></div><div class="card"><div class="field"><label>Решения и изменения планов</label><textarea id="meetingDecisions">${escapeHtml(m.decisions)}</textarea></div><div class="field"><label>Фокус следующего месяца</label><textarea id="meetingNextFocus">${escapeHtml(m.nextFocus)}</textarea></div><div class="field"><label>Следующая встреча</label><input type="date" id="meetingNextMeeting" value="${m.nextMeeting||''}"></div></div></div><div class="section"><div class="section-head"><h2>Журнал встреч</h2></div>${meetingHistory()}</div>`;
}
function meetingHistory(){ const rows=[...state.meetings].sort((a,b)=>b.month.localeCompare(a.month)); return `<div class="table-wrap"><table><thead><tr><th>Месяц</th><th>Дата</th><th>Главные результаты</th><th>Фокус дальше</th></tr></thead><tbody>${rows.map(m=>`<tr><td><b>${monthLabel(m.month)}</b></td><td>${m.date?formatDate(m.date):'—'}</td><td>${escapeHtml(m.keyResults||'—')}</td><td>${escapeHtml(m.nextFocus||'—')}</td></tr>`).join('')}</tbody></table></div>`; }

function renderReports(){
  const tasks = state.taskMonths.filter(r=>r.month>=ui.reportFrom && r.month<=ui.reportTo).map(r=>({r,t:getTask(r.taskId)})).filter(x=>x.t);
  const crm = state.crm.filter(c=>c.month>=ui.reportFrom && c.month<=ui.reportTo).sort((a,b)=>a.month.localeCompare(b.month));
  return `<div class="card no-print"><div class="form-grid"><div class="field"><label>С месяца</label><input type="month" id="reportFrom" value="${ui.reportFrom}"></div><div class="field"><label>По месяц</label><input type="month" id="reportTo" value="${ui.reportTo}"></div></div><div class="toolbar" style="margin-top:14px"><button class="btn primary" data-export-tasks>Скачать задачи CSV</button><button class="btn" data-export-crm>Скачать CRM CSV</button><button class="btn" data-export-json>Резервная копия JSON</button><label class="btn" for="importJson">Импорт JSON</label><input class="file-input" id="importJson" type="file" accept="application/json"><button class="btn" data-print>Печать / PDF</button></div></div>
    <div class="report-preview section"><h2>Отчёт: ${monthLabel(ui.reportFrom)} — ${monthLabel(ui.reportTo)}</h2><p class="muted">Задач в периоде: ${tasks.length}. CRM-срезов: ${crm.length}.</p>${DIRECTIONS.map(d=>reportDirection(d,tasks)).join('')}<h3>CRM</h3>${crm.length?`<table><thead><tr><th>Месяц</th><th>Всего</th><th>Состояние</th><th>Следующий шаг</th></tr></thead><tbody>${crm.map(c=>`<tr><td>${monthLabel(c.month)}</td><td>${crmTotal(c)??'—'}</td><td>${escapeHtml(c.state||'—')}</td><td>${escapeHtml(c.nextStep||'—')}</td></tr>`).join('')}</tbody></table>`:'<p>Нет данных CRM.</p>'}</div>`;
}
function reportDirection(direction, items){ const rows=items.filter(x=>x.t.direction===direction); if(!rows.length)return''; return `<h3>${direction}</h3><table><thead><tr><th>Месяц</th><th>Задача</th><th>Статус</th><th>Итог</th></tr></thead><tbody>${rows.map(({t,r})=>`<tr><td>${monthLabel(r.month)}</td><td>${escapeHtml(t.id+' '+t.title)}</td><td>${escapeHtml(r.status||'—')}</td><td>${escapeHtml(r.monthResult||'Без итога')}</td></tr>`).join('')}</tbody></table>`; }

function renderModal(){
  if(ui.modal==='task') return renderTaskModal();
  if(ui.modal==='project') return renderProjectModal();
  if(ui.modal==='closeMonth') return renderCloseMonthModal();
  return '';
}
function taskHistoryHtml(t){
  if(!t) return '';
  const rows=state.taskMonths.filter(r=>r.taskId===t.id).sort((a,b)=>b.month.localeCompare(a.month));
  if(rows.length<=1) return '';
  return `<details class="task-history"><summary>История задачи по месяцам <span class="muted">${rows.length} записей</span></summary><div class="task-history-list">${rows.map(r=>`<div class="task-history-row"><b>${monthLabel(r.month)}</b><span>${statusBadge(r.status)}</span><span>${resultBadge(r.monthResult)}</span>${r.actual?`<p>${escapeHtml(r.actual)}</p>`:''}</div>`).join('')}</div></details>`;
}
function renderTaskModal(){
  const t=ui.editTaskId?getTask(ui.editTaskId):null; const r=t?getMonthRecord(t.id,ui.month):null; const direction=t?.direction||ui.taskDirection||'ПСТБИ'; const projectCode=t?.projectCode||ui.taskProject||state.projects.find(p=>p.direction===direction)?.code||'';
  return `<div class="modal-backdrop" data-close-modal><div class="modal task-modal" onclick="event.stopPropagation()">
    <div class="modal-title-row"><div><div class="eyebrow">${t?'Карточка задачи':'Быстрое добавление'}</div><h3>${t?'Задача '+escapeHtml(t.id):'Новая задача'}</h3></div>${t?`<div class="quick-task-actions"><button class="btn small success" data-quick-done>✓ Готово</button><button class="btn small" data-quick-carry>→ Перенести</button></div>`:''}</div>
    <section class="task-form-section"><div class="task-form-heading"><b>1. Основное</b><span>Достаточно указать направление, проект и название.</span></div><div class="form-grid">
      <div class="field"><label>Направление</label><select id="taskDirection">${options(DIRECTIONS,direction,null)}</select></div>
      <div class="field"><label>Проект</label><select id="taskProject">${state.projects.filter(p=>p.direction===direction).map(p=>`<option value="${p.code}" ${p.code===projectCode?'selected':''}>${escapeHtml(p.code+' '+p.name)}</option>`).join('')}</select></div>
      <div class="field wide"><label>Название задачи</label><textarea id="taskTitle" class="task-title-input" placeholder="Что нужно сделать?">${escapeHtml(t?.title||'')}</textarea></div>
      <div class="field"><label>ID задачи</label><input id="taskId" value="${escapeHtml(t?.id||nextTaskId(projectCode))}" ${t?'readonly':''}></div>
      <div class="field"><label>Тип записи</label><select id="taskType">${options(TASK_TYPES,t?.type||'Задача',null)}</select></div>
    </div></section>
    <section class="task-form-section"><div class="task-form-heading"><b>2. План на ${monthLabel(ui.month)}</b><span>Срок и приоритет можно оставить пустыми.</span></div><div class="form-grid">
      <div class="field"><label>Месяц</label><input type="month" id="taskMonth" value="${ui.month}"></div>
      <div class="field"><label>Родительская задача</label><input id="taskParent" value="${escapeHtml(t?.parentId||'')}" placeholder="например 2.2-01"></div>
      <div class="field wide"><label>Планируемый результат месяца</label><textarea id="taskPlanned">${escapeHtml(r?.planned||t?.title||'')}</textarea></div>
      <div class="field"><label>Срок</label><input type="date" id="taskDeadline" value="${r?.deadline||''}"></div>
      <div class="field"><label>Приоритет</label><select id="taskPriority">${options(PRIORITIES.filter(Boolean),r?.priority||'','—')}</select></div>
      <div class="field"><label>Рабочий статус</label><select id="taskStatus">${options(WORK_STATUSES,r?.status||'Запланировано',null)}</select></div>
    </div></section>
    <details class="task-form-section result-section" ${t&&r?.monthResult?'open':''}><summary><b>3. Итог месяца</b><span>Заполняется при супервизии или закрытии месяца</span></summary><div class="form-grid result-grid">
      <div class="field"><label>Итог месяца</label><select id="taskResult">${options(MONTH_RESULTS.filter(Boolean),r?.monthResult||'','Без итога')}</select></div>
      <div class="field wide"><label>Фактический результат</label><textarea id="taskActual">${escapeHtml(r?.actual||'')}</textarea></div>
      <div class="field"><label>Что помешало / нужна помощь</label><textarea id="taskBlocker">${escapeHtml(r?.blocker||'')}</textarea></div>
      <div class="field"><label>Решение / следующий шаг</label><textarea id="taskNextStep">${escapeHtml(r?.nextStep||'')}</textarea></div>
    </div></details>
    ${taskHistoryHtml(t)}
    <div class="modal-actions">${t?'<button class="btn danger" data-delete-task>Удалить задачу</button>':''}<button class="btn" data-close-modal>Отмена</button>${!t?'<button class="btn" data-save-task-add>Сохранить и добавить ещё</button>':''}<button class="btn primary" data-save-task>Сохранить</button></div>
  </div></div>`;
}
function renderCloseMonthModal(){
  const records=taskRecordsForMonth(ui.month);
  const crm=state.crm.find(c=>c.month===ui.month); const filled=crm?CRM_STAGES.filter(stage=>crm.stages?.[stage]!==''&&crm.stages?.[stage]!==null&&crm.stages?.[stage]!==undefined).length:0;
  const meeting=state.meetings.find(m=>m.month===ui.month);
  const unresolved=records.filter(({r})=>!r.monthResult).length;
  const next=nextMonth(ui.month);
  return `<div class="modal-backdrop" data-close-modal><div class="modal close-month-modal" onclick="event.stopPropagation()">
    <div class="modal-title-row"><div><div class="eyebrow">Переход к ${monthLabel(next)}</div><h3>Закрыть ${monthLabel(ui.month)}</h3></div><span class="badge ${unresolved?'amber':'green'}">${unresolved?`${unresolved} без итога`:'Итоги заполнены'}</span></div>
    <div class="close-checks">
      <div class="close-check ${unresolved?'warn':'ok'}"><b>Задачи</b><span>${unresolved?`${unresolved} задач требуют итога`:'Все задачи имеют итог'}</span></div>
      <div class="close-check ${filled<CRM_STAGES.length?'warn':'ok'}"><b>CRM</b><span>${filled}/${CRM_STAGES.length} стадий заполнено</span></div>
      <div class="close-check ${meeting?.nextFocus?'ok':'warn'}"><b>Следующий месяц</b><span>${meeting?.nextFocus?'Фокус зафиксирован':'Фокус ещё не указан'}</span></div>
    </div>
    <div class="close-month-tools"><span class="muted">Для незавершённых задач можно одним действием выбрать перенос.</span><button class="btn small" data-mark-open-carry>Перенести все без итога</button></div>
    <div class="close-task-list">${records.length?records.map(({t,r})=>`<div class="close-task-row"><div class="close-task-copy"><b>${escapeHtml(t.id)}</b><span>${escapeHtml(t.title)}</span><small>${escapeHtml(projectName(t.projectCode))}</small></div><select data-close-result="${escapeHtml(t.id)}">${options(MONTH_RESULTS.filter(Boolean),r.monthResult||(r.status==='Завершено'?'Готово':''),'Без итога')}</select></div>`).join(''):'<div class="empty compact">В этом месяце нет задач.</div>'}</div>
    <div class="notice">При выборе «Перенесено» задача автоматически появится в ${monthLabel(next)}. Запись за ${monthLabel(ui.month)} останется в истории без изменений.</div>
    <div class="modal-actions"><button class="btn" data-close-modal>Отмена</button><button class="btn primary" data-save-month-results>Сохранить итоги месяца</button></div>
  </div></div>`;
}
function renderProjectModal(){ return `<div class="modal-backdrop" data-close-modal><div class="modal" onclick="event.stopPropagation()"><h3>Новый проект</h3><div class="form-grid"><div class="field"><label>Направление</label><select id="projectDirection">${options(DIRECTIONS,'ПСТБИ',null)}</select></div><div class="field"><label>Код</label><input id="projectCode" placeholder="например 1.4"></div><div class="field wide"><label>Название</label><input id="projectName"></div><div class="field"><label>Тип</label><select id="projectType">${options(['Проект','Постоянная работа'],'Проект',null)}</select></div></div><div class="modal-actions"><button class="btn" data-close-modal>Отмена</button><button class="btn primary" data-save-project>Добавить</button></div></div></div>`; }

function bind(){
  document.querySelectorAll('[data-nav]').forEach(el=>el.onclick=()=>{ui.page=el.dataset.nav;render();});
  const gm=document.querySelector('#globalMonth'); if(gm) gm.onchange=e=>{ui.month=e.target.value;render();};
  document.querySelector('[data-month-prev]')?.addEventListener('click',()=>{ui.month=prevMonth(ui.month);render();});
  document.querySelector('[data-month-next]')?.addEventListener('click',()=>{ui.month=nextMonth(ui.month);render();});
  document.querySelector('[data-add-task]')?.addEventListener('click',()=>{ui.editTaskId=null;ui.modal='task';render();});
  document.querySelector('[data-add-project]')?.addEventListener('click',()=>{ui.modal='project';render();});
  document.querySelectorAll('[data-close-month]').forEach(el=>el.onclick=()=>{ui.modal='closeMonth';render();});
  document.querySelectorAll('[data-dashboard-task]').forEach(el=>el.onclick=()=>{ui.editTaskId=el.dataset.dashboardTask;ui.modal='task';render();});
  document.querySelectorAll('[data-dashboard-direction]').forEach(el=>el.onclick=()=>{ui.page='tasks';ui.taskDirection=el.dataset.dashboardDirection;ui.taskProject='';ui.taskStatus='';ui.taskSearch='';render();});
  document.querySelectorAll('[data-close-modal]').forEach(el=>el.onclick=()=>{ui.modal=null;ui.editTaskId=null;render();});
  bindTasks(); bindProjects(); bindCompare(); bindCrm(); bindMeetings(); bindReports(); bindModal();
}
function bindTasks(){
  const fd=document.querySelector('#filterDirection'); if(fd)fd.onchange=e=>{ui.taskDirection=e.target.value;ui.taskProject='';render();};
  const fp=document.querySelector('#filterProject'); if(fp)fp.onchange=e=>{ui.taskProject=e.target.value;render();};
  const fs=document.querySelector('#filterStatus'); if(fs)fs.onchange=e=>{ui.taskStatus=e.target.value;render();};
  const fq=document.querySelector('#filterSearch'); if(fq)fq.oninput=e=>{ui.taskSearch=e.target.value;render();setTimeout(()=>document.querySelector('#filterSearch')?.focus(),0);};
  document.querySelectorAll('[data-edit-task]').forEach(b=>b.onclick=()=>{ui.editTaskId=b.dataset.editTask;ui.modal='task';render();});
  document.querySelectorAll('[data-copy-task]').forEach(b=>b.onclick=()=>carryTask(b.dataset.copyTask,ui.month,nextMonth(ui.month)));
  document.querySelectorAll('[data-plan-task]').forEach(b=>b.onclick=()=>planTask(b.dataset.planTask,ui.month));
}
function bindProjects(){
  document.querySelectorAll('[data-project-task]').forEach(b=>b.onclick=()=>{const p=state.projects.find(x=>x.code===b.dataset.projectTask);ui.taskDirection=p.direction;ui.taskProject=p.code;ui.editTaskId=null;ui.modal='task';render();});
  document.querySelectorAll('[data-delete-project]').forEach(b=>b.onclick=()=>{const code=b.dataset.deleteProject;if(state.tasks.some(t=>t.projectCode===code)) return alert('Сначала удалите или перенесите задачи этого проекта.'); if(confirm('Удалить проект?')){state.projects=state.projects.filter(p=>p.code!==code);saveState();render();}});
}
function bindCompare(){ const a=document.querySelector('#compareMonth');if(a)a.onchange=e=>{ui.compareMonth=e.target.value;render();};const b=document.querySelector('#compareCurrent');if(b)b.onchange=e=>{ui.month=e.target.value;render();}; }
function bindCrm(){
  const c=ensureCrm(ui.month); const save=()=>{saveState();render();};
  document.querySelector('#crmSnapshotDate')?.addEventListener('change',e=>{c.snapshotDate=e.target.value;save();});
  document.querySelectorAll('[data-crm-stage]').forEach(i=>i.onchange=e=>{c.stages[e.target.dataset.crmStage]=e.target.value===''?'':Number(e.target.value);save();});
  [['crmState','state'],['crmChanges','changes'],['crmProblems','problems'],['crmNextStep','nextStep']].forEach(([id,key])=>{const el=document.querySelector('#'+id); if(el) el.onchange=e=>{c[key]=e.target.value;saveState();};});
}
function bindMeetings(){ const m=ensureMeeting(ui.month); [['meetingDate','date'],['meetingKeyResults','keyResults'],['meetingDifficulties','difficulties'],['meetingDecisions','decisions'],['meetingNextFocus','nextFocus'],['meetingNextMeeting','nextMeeting']].forEach(([id,key])=>{const el=document.querySelector('#'+id);if(el)el.onchange=e=>{m[key]=e.target.value;saveState();render();};}); }
function bindReports(){
  const f=document.querySelector('#reportFrom');if(f)f.onchange=e=>{ui.reportFrom=e.target.value;render();}; const t=document.querySelector('#reportTo');if(t)t.onchange=e=>{ui.reportTo=e.target.value;render();};
  document.querySelector('[data-export-tasks]')?.addEventListener('click',exportTasksCsv); document.querySelector('[data-export-crm]')?.addEventListener('click',exportCrmCsv); document.querySelector('[data-export-json]')?.addEventListener('click',exportJson); document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
  document.querySelector('#importJson')?.addEventListener('change',importJson);
}
function bindModal(){
  document.querySelector('#taskDirection')?.addEventListener('change',e=>{const d=e.target.value; const select=document.querySelector('#taskProject'); select.innerHTML=state.projects.filter(p=>p.direction===d).map(p=>`<option value="${p.code}">${escapeHtml(p.code+' '+p.name)}</option>`).join(''); if(!ui.editTaskId){const p=select.value;document.querySelector('#taskId').value=nextTaskId(p);} });
  document.querySelector('#taskProject')?.addEventListener('change',e=>{if(!ui.editTaskId)document.querySelector('#taskId').value=nextTaskId(e.target.value);});
  document.querySelector('[data-save-task]')?.addEventListener('click',()=>saveTaskFromModal(false));
  document.querySelector('[data-save-task-add]')?.addEventListener('click',()=>saveTaskFromModal(true));
  document.querySelector('[data-quick-done]')?.addEventListener('click',()=>quickFinishTask('Готово'));
  document.querySelector('[data-quick-carry]')?.addEventListener('click',()=>quickFinishTask('Перенесено'));
  document.querySelector('[data-mark-open-carry]')?.addEventListener('click',()=>{document.querySelectorAll('[data-close-result]').forEach(sel=>{if(!sel.value)sel.value='Перенесено';});});
  document.querySelector('[data-save-month-results]')?.addEventListener('click',saveMonthResults);
  document.querySelector('[data-delete-task]')?.addEventListener('click',()=>{const id=ui.editTaskId;if(confirm(`Удалить задачу ${id} и всю её месячную историю?`)){state.tasks=state.tasks.filter(t=>t.id!==id);state.taskMonths=state.taskMonths.filter(r=>r.taskId!==id);saveState();ui.modal=null;ui.editTaskId=null;render();}});
  document.querySelector('[data-save-project]')?.addEventListener('click',()=>{const code=v('projectCode').trim(),name=v('projectName').trim();if(!code||!name)return alert('Заполните код и название.');if(state.projects.some(p=>p.code===code))return alert('Такой код уже существует.');state.projects.push({code,direction:v('projectDirection'),name,type:v('projectType')});saveState();ui.modal=null;render();});
}
function v(id){ return document.querySelector('#'+id)?.value||''; }
function saveTaskFromModal(addAnother=false){
  const id=v('taskId').trim(), month=v('taskMonth'); if(!id||!v('taskTitle').trim()||!month) return alert('Заполните ID, название и месяц.');
  let t=getTask(id); if(!t){ if(state.tasks.some(x=>x.id===id))return alert('Такой ID уже есть.'); t={id,direction:v('taskDirection'),projectCode:v('taskProject'),title:v('taskTitle').trim(),parentId:v('taskParent').trim(),type:v('taskType')}; state.tasks.push(t); }
  else Object.assign(t,{direction:v('taskDirection'),projectCode:v('taskProject'),title:v('taskTitle').trim(),parentId:v('taskParent').trim(),type:v('taskType')});
  let r=getMonthRecord(id,month); if(!r){r={taskId:id,month};state.taskMonths.push(r);} Object.assign(r,{planned:v('taskPlanned')||v('taskTitle').trim(),deadline:v('taskDeadline'),priority:v('taskPriority'),status:v('taskStatus'),monthResult:v('taskResult'),actual:v('taskActual'),blocker:v('taskBlocker'),nextStep:v('taskNextStep'),carryTo:r.carryTo||''});
  if(r.monthResult==='Перенесено'){ carryTaskRecord(r,month,nextMonth(month)); }
  if(r.monthResult!=='Перенесено'){ r.carryTo=''; }
  saveState(); ui.month=month;
  if(addAnother){ ui.editTaskId=null; ui.modal='task'; render(); return; }
  ui.modal=null; ui.editTaskId=null; render();
}
function carryTaskRecord(src,from,to){
  let dst=getMonthRecord(src.taskId,to);
  if(!dst){dst={...clone(src),month:to,monthResult:'',actual:'',blocker:'',carryTo:'',status:'Запланировано'};state.taskMonths.push(dst);}
  src.monthResult='Перенесено'; src.carryTo=to;
}
function quickFinishTask(result){
  const t=ui.editTaskId?getTask(ui.editTaskId):null; if(!t)return;
  const month=v('taskMonth')||ui.month; let r=getMonthRecord(t.id,month); if(!r)return;
  r.monthResult=result;
  if(result==='Готово'){r.status='Завершено';r.carryTo='';}
  if(result==='Перенесено') carryTaskRecord(r,month,nextMonth(month));
  saveState(); ui.modal=null; ui.editTaskId=null; render();
}
function saveMonthResults(){
  const next=nextMonth(ui.month); let carried=0, changed=0;
  document.querySelectorAll('[data-close-result]').forEach(sel=>{
    const id=sel.dataset.closeResult; const r=getMonthRecord(id,ui.month); if(!r)return;
    const result=sel.value;
    if(r.monthResult!==result) changed++;
    r.monthResult=result;
    if(result==='Готово'){r.status='Завершено';r.carryTo='';}
    else if(result==='Перенесено'){carryTaskRecord(r,ui.month,next);carried++;}
    else if(result!=='Перенесено'){r.carryTo='';}
  });
  saveState(); ui.modal=null; render();
  alert(`Итоги ${monthLabel(ui.month)} сохранены.${carried?` Перенесено в ${monthLabel(next)}: ${carried}.`:''}`);
}
function planTask(taskId,month){
  if(getMonthRecord(taskId,month))return; const t=getTask(taskId); if(!t)return; state.taskMonths.push({taskId,month,planned:t.title,deadline:'',priority:'',status:t.type==='Предложение'?'К согласованию':'Запланировано',monthResult:'',actual:'',blocker:'',nextStep:'',carryTo:''}); saveState(); render();
}
function carryTask(taskId,from,to){
  const src=getMonthRecord(taskId,from); if(!src)return; carryTaskRecord(src,from,to); saveState();alert(`Задача перенесена в ${monthLabel(to)}. История ${monthLabel(from)} сохранена.`);render();
}
function formatDate(s){ if(!s)return'—'; const [y,m,d]=s.split('-');return `${d}.${m}.${y}`; }
function download(name,content,type='text/plain;charset=utf-8'){ const blob=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000); }
function csvCell(v){ const s=String(v??''); return `"${s.replaceAll('"','""')}"`; }
function exportTasksCsv(){
  const rows=[['Месяц','Направление','Проект','ID','Задача','Срок','Приоритет','Статус','Итог месяца','Фактический результат','Что помешало','Следующий шаг','Перенос на']];
  state.taskMonths.filter(r=>r.month>=ui.reportFrom&&r.month<=ui.reportTo).sort((a,b)=>a.month.localeCompare(b.month)).forEach(r=>{const t=getTask(r.taskId);if(!t)return;rows.push([r.month,t.direction,projectName(t.projectCode),t.id,t.title,r.deadline,r.priority,r.status,r.monthResult,r.actual,r.blocker,r.nextStep,r.carryTo]);});
  download(`tasks_${ui.reportFrom}_${ui.reportTo}.csv`,'\ufeff'+rows.map(r=>r.map(csvCell).join(';')).join('\n'),'text/csv;charset=utf-8');
}
function exportCrmCsv(){
  const rows=[['Месяц','Дата среза',...CRM_STAGES,'Всего','Состояние базы','Что сделано / изменилось','Проблемы / нужна помощь','Следующий шаг']];
  state.crm.filter(c=>c.month>=ui.reportFrom&&c.month<=ui.reportTo).sort((a,b)=>a.month.localeCompare(b.month)).forEach(c=>rows.push([c.month,c.snapshotDate,...CRM_STAGES.map(s=>c.stages[s]),crmTotal(c)??'',c.state,c.changes,c.problems,c.nextStep]));
  download(`crm_${ui.reportFrom}_${ui.reportTo}.csv`,'\ufeff'+rows.map(r=>r.map(csvCell).join(';')).join('\n'),'text/csv;charset=utf-8');
}
function exportJson(){ download(`supervision_backup_${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(state,null,2),'application/json'); }
function importJson(e){ const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!data.projects||!data.tasks||!data.taskMonths)throw new Error();if(confirm('Заменить текущие данные данными из резервной копии?')){state=data;saveState();render();}}catch{alert('Не удалось прочитать резервную копию.');}};reader.readAsText(file); }

render();
